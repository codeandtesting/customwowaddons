'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { parseGIF, decompressFrames } from 'gifuct-js';

// ── Browser-native TGA encoder (uses Uint8Array instead of Node Buffer) ──
function canvasToTGA(canvas: HTMLCanvasElement): Blob {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D context');

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const width = canvas.width;
  const height = canvas.height;
  const numPixels = width * height;

  // Reorder RGBA to BGRA (standard TGA channel order)
  const bgraData = new Uint8Array(numPixels * 4);
  for (let i = 0; i < data.length; i += 4) {
    bgraData[i] = data[i + 2];     // B
    bgraData[i + 1] = data[i + 1]; // G
    bgraData[i + 2] = data[i];     // R
    bgraData[i + 3] = data[i + 3]; // A
  }

  // Pre-allocate worst-case buffer: 18 (header) + input size + packet headers
  const maxCompressedSize = 18 + bgraData.length + Math.ceil(numPixels / 128);
  const outBuffer = new Uint8Array(maxCompressedSize);

  // 18-byte TGA Header (RLE Truecolor, 32-bit RGBA)
  outBuffer[2] = 10; // Image type: 10 = RLE Truecolor
  outBuffer[12] = width & 0xff;
  outBuffer[13] = (width >> 8) & 0xff;
  outBuffer[14] = height & 0xff;
  outBuffer[15] = (height >> 8) & 0xff;
  outBuffer[16] = 32; // 32-bit pixel depth
  outBuffer[17] = 0x28;  // top-left origin, 8 attribute bits

  let outIdx = 18;
  let pixelIdx = 0;

  while (pixelIdx < numPixels) {
    let runLen = 1;
    const startIdx = pixelIdx * 4;
    const b = bgraData[startIdx];
    const g = bgraData[startIdx + 1];
    const r = bgraData[startIdx + 2];
    const a = bgraData[startIdx + 3];

    // Count consecutive identical pixels (up to 128)
    while (pixelIdx + runLen < numPixels && runLen < 128) {
      const nextIdx = (pixelIdx + runLen) * 4;
      if (
        bgraData[nextIdx] === b &&
        bgraData[nextIdx + 1] === g &&
        bgraData[nextIdx + 2] === r &&
        bgraData[nextIdx + 3] === a
      ) {
        runLen++;
      } else {
        break;
      }
    }

    if (runLen >= 2) {
      // Write Run-Length Packet: MSB is 1, count-1 in bits 0-6
      outBuffer[outIdx++] = 0x80 | (runLen - 1);
      outBuffer[outIdx++] = b;
      outBuffer[outIdx++] = g;
      outBuffer[outIdx++] = r;
      outBuffer[outIdx++] = a;
      pixelIdx += runLen;
    } else {
      // Find length of run of different pixels (up to 128)
      let rawLen = 1;
      while (pixelIdx + rawLen < numPixels && rawLen < 128) {
        const currentIdx = (pixelIdx + rawLen) * 4;
        // If we encounter consecutive identical pixels, stop the raw packet to allow RLE run
        if (pixelIdx + rawLen + 1 < numPixels) {
          const nextIdx = (pixelIdx + rawLen + 1) * 4;
          if (
            bgraData[currentIdx] === bgraData[nextIdx] &&
            bgraData[currentIdx + 1] === bgraData[nextIdx + 1] &&
            bgraData[currentIdx + 2] === bgraData[nextIdx + 2] &&
            bgraData[currentIdx + 3] === bgraData[nextIdx + 3]
          ) {
            break;
          }
        }
        rawLen++;
      }

      // Write Raw Packet: MSB is 0, count-1 in bits 0-6
      outBuffer[outIdx++] = rawLen - 1;
      for (let i = 0; i < rawLen; i++) {
        const idx = (pixelIdx + i) * 4;
        outBuffer[outIdx++] = bgraData[idx];
        outBuffer[outIdx++] = bgraData[idx + 1];
        outBuffer[outIdx++] = bgraData[idx + 2];
        outBuffer[outIdx++] = bgraData[idx + 3];
      }
      pixelIdx += rawLen;
    }
  }

  // Slice to actual size
  const finalBuffer = outBuffer.subarray(0, outIdx);
  return new Blob([finalBuffer], { type: 'image/x-tga' });
}

// ── Helper functions for frame count detection ──
function getOptimalGridDimensions(frameCount: number): { cols: number; rows: number } {
  if (frameCount <= 0) return { cols: 5, rows: 5 };
  const cols = Math.ceil(Math.sqrt(frameCount));
  const rows = Math.ceil(frameCount / cols);
  return { cols, rows };
}

async function detectFrameCount(file: File): Promise<number> {
  const arrayBuffer = await file.arrayBuffer();
  if (file.type === 'image/gif') {
    try {
      const gifData = parseGIF(arrayBuffer);
      const frames = decompressFrames(gifData, true);
      return frames.length;
    } catch (e) {
      console.error('Failed to parse GIF frames client-side:', e);
      return 0;
    }
  } else if (file.type === 'image/webp') {
    try {
      const view = new Uint8Array(arrayBuffer);
      let count = 0;
      for (let i = 0; i < view.length - 4; i++) {
        if (
          view[i] === 0x41 &&
          view[i + 1] === 0x4E &&
          view[i + 2] === 0x4D &&
          view[i + 3] === 0x46
        ) {
          count++;
        }
      }
      return count === 0 ? 1 : count;
    } catch (e) {
      console.error('Failed to parse WebP frames client-side:', e);
      return 0;
    }
  }
  return 0;
}

// ── Client-side GIF → TGA/PNG sprite sheet conversion ──
async function convertGifClientSide(
  file: File,
  cols: number,
  rows: number,
  format: 'tga' | 'png',
  maxFrameSize: number
): Promise<{ previewUrl: string; blob: Blob; filename: string }> {
  const arrayBuffer = await file.arrayBuffer();
  const gifData = parseGIF(arrayBuffer);
  const frames = decompressFrames(gifData, true);

  if (frames.length === 0) {
    throw new Error('No frames found in GIF');
  }

  const origFrameWidth = gifData.lsd.width;
  const origFrameHeight = gifData.lsd.height;
  let frameWidth = origFrameWidth;
  let frameHeight = origFrameHeight;

  if (maxFrameSize > 0 && (frameWidth > maxFrameSize || frameHeight > maxFrameSize)) {
    const ratio = Math.min(maxFrameSize / frameWidth, maxFrameSize / frameHeight);
    frameWidth = Math.round(frameWidth * ratio);
    frameHeight = Math.round(frameHeight * ratio);
  }

  const spriteSheetWidth = frameWidth * cols;
  const spriteSheetHeight = frameHeight * rows;

  // Create the main sprite sheet canvas
  const canvas = document.createElement('canvas');
  canvas.width = spriteSheetWidth;
  canvas.height = spriteSheetHeight;
  const ctx = canvas.getContext('2d')!;

  // We need a compositing canvas to properly handle GIF disposal methods in their original size
  const compCanvas = document.createElement('canvas');
  compCanvas.width = origFrameWidth;
  compCanvas.height = origFrameHeight;
  const compCtx = compCanvas.getContext('2d')!;

  const maxFrames = Math.min(frames.length, cols * rows);

  for (let i = 0; i < maxFrames; i++) {
    const frame = frames[i];
    const dims = frame.dims;
    const patch = frame.patch;

    // Create a temporary canvas for this frame's patch
    const patchCanvas = document.createElement('canvas');
    patchCanvas.width = dims.width;
    patchCanvas.height = dims.height;
    const patchCtx = patchCanvas.getContext('2d')!;

    const imageData = patchCtx.createImageData(dims.width, dims.height);
    imageData.data.set(patch);
    patchCtx.putImageData(imageData, 0, 0);

    // Handle disposal: for first frame or restoreToBackgroundColor, clear first
    if (i === 0 || frame.disposalType === 2) {
      compCtx.clearRect(0, 0, origFrameWidth, origFrameHeight);
    }

    // Draw the patch onto the compositing canvas at the correct offset
    compCtx.drawImage(patchCanvas, dims.left, dims.top);

    // Draw the composed frame onto the sprite sheet grid, scaled if necessary
    const row = Math.floor(i / cols);
    const col = i % cols;
    ctx.drawImage(
      compCanvas,
      0,
      0,
      origFrameWidth,
      origFrameHeight,
      col * frameWidth,
      row * frameHeight,
      frameWidth,
      frameHeight
    );

    // Handle disposal after drawing
    if (frame.disposalType === 2) {
      // Restore to background: clear the patch area
      compCtx.clearRect(dims.left, dims.top, dims.width, dims.height);
    }
    // disposalType 3 (restore to previous) is rare; we ignore it for simplicity
  }

  // Generate preview as data URL
  const previewUrl = canvas.toDataURL('image/png');

  let blob: Blob;
  let filename: string;
  const baseName = file.name.replace(/\.(gif|webp)$/i, '');

  if (format === 'tga') {
    blob = canvasToTGA(canvas);
    filename = `${baseName}_col-${cols}_row-${rows}.tga`;
  } else {
    // Generate PNG blob
    const pngBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!pngBlob) throw new Error('Failed to generate PNG blob');
    blob = pngBlob;
    filename = `${baseName}_col-${cols}_row-${rows}.png`;
  }

  return { previewUrl, blob, filename };
}

async function convertWebPClientSide(
  file: File,
  cols: number,
  rows: number,
  format: 'tga' | 'png',
  maxFrameSize: number
): Promise<{ previewUrl: string; blob: Blob; filename: string }> {
  const ImageDecoderClass = (window as any).ImageDecoder;
  if (typeof ImageDecoderClass === 'undefined') {
    throw new Error('Your browser does not support client-side WebP decoding (requires WebCodecs API). Please update your browser.');
  }

  const decoder = new ImageDecoderClass({
    data: (file as any).stream ? (file as any).stream() : file,
    type: 'image/webp',
  });

  await decoder.tracks.ready;
  const track = decoder.tracks.selectedTrack;
  const frameCount = track.frameCount;

  if (frameCount === 0) {
    throw new Error('No frames found in WebP');
  }

  // Get dimensions of first frame
  const firstFrameResult = await decoder.decode({ frameIndex: 0 });
  const origFrameWidth = firstFrameResult.image.displayWidth;
  const origFrameHeight = firstFrameResult.image.displayHeight;
  firstFrameResult.image.close();

  let frameWidth = origFrameWidth;
  let frameHeight = origFrameHeight;

  if (maxFrameSize > 0 && (frameWidth > maxFrameSize || frameHeight > maxFrameSize)) {
    const ratio = Math.min(maxFrameSize / frameWidth, maxFrameSize / frameHeight);
    frameWidth = Math.round(frameWidth * ratio);
    frameHeight = Math.round(frameHeight * ratio);
  }

  const spriteSheetWidth = frameWidth * cols;
  const spriteSheetHeight = frameHeight * rows;

  const canvas = document.createElement('canvas');
  canvas.width = spriteSheetWidth;
  canvas.height = spriteSheetHeight;
  const ctx = canvas.getContext('2d')!;

  const maxFrames = Math.min(frameCount, cols * rows);

  for (let i = 0; i < maxFrames; i++) {
    const result = await decoder.decode({ frameIndex: i });
    const videoFrame = result.image;
    
    const row = Math.floor(i / cols);
    const col = i % cols;
    
    ctx.drawImage(
      videoFrame,
      0,
      0,
      videoFrame.displayWidth,
      videoFrame.displayHeight,
      col * frameWidth,
      row * frameHeight,
      frameWidth,
      frameHeight
    );
    videoFrame.close();
  }

  // Generate preview as data URL
  const previewUrl = canvas.toDataURL('image/png');

  let blob: Blob;
  let filename: string;
  const baseName = file.name.replace(/\.(gif|webp)$/i, '');

  if (format === 'tga') {
    blob = canvasToTGA(canvas);
    filename = `${baseName}_col-${cols}_row-${rows}.tga`;
  } else {
    const pngBlob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
    if (!pngBlob) throw new Error('Failed to generate PNG blob');
    blob = pngBlob;
    filename = `${baseName}_col-${cols}_row-${rows}.png`;
  }

  return { previewUrl, blob, filename };
}

export default function ConverterClient() {
  const [file, setFile] = useState<File | null>(null);
  const [cols, setCols] = useState<number>(5);
  const [rows, setRows] = useState<number>(5);
  const [format, setFormat] = useState<'tga' | 'png'>('tga');
  const [converting, setConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadFilename, setDownloadFilename] = useState<string>('output.tga');
  const [preview, setPreview] = useState<string | null>(null);
  const [spriteSheetPreview, setSpriteSheetPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [detectedFrames, setDetectedFrames] = useState<number | null>(null);
  const [maxFrameSize, setMaxFrameSize] = useState<number>(128);

  const loadFile = async (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
    setDownloadUrl(null);
    setSpriteSheetPreview(null);
    setDetectedFrames(null);

    // Auto-detect frame count and set optimal grid dimensions
    try {
      const frameCount = await detectFrameCount(selectedFile);
      if (frameCount > 0) {
        setDetectedFrames(frameCount);
        const { cols: optCols, rows: optRows } = getOptimalGridDimensions(frameCount);
        setCols(optCols);
        setRows(optRows);
      }
    } catch (err) {
      console.error('Error auto-detecting frame count:', err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && (selectedFile.type === 'image/gif' || selectedFile.type === 'image/webp')) {
      loadFile(selectedFile);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'image/gif' || droppedFile.type === 'image/webp') {
        loadFile(droppedFile);
      } else {
        alert('Please upload a GIF or WebP image.');
      }
    }
  };

  const handleFormatChange = (newFormat: 'tga' | 'png') => {
    setFormat(newFormat);
    setDownloadUrl(null);
    setSpriteSheetPreview(null);
  };

  const handleConvert = async () => {
    if (!file) return;

    setConverting(true);
    setDownloadUrl(null);
    setSpriteSheetPreview(null);

    try {
      if (file.type === 'image/gif') {
        // ── GIF: Convert entirely in the browser (no server upload) ──
        const result = await convertGifClientSide(file, cols, rows, format, maxFrameSize);

        setSpriteSheetPreview(result.previewUrl);
        setDownloadFilename(result.filename);

        const url = URL.createObjectURL(result.blob);
        setDownloadUrl(url);
      } else if (file.type === 'image/webp' && typeof window !== 'undefined' && 'ImageDecoder' in window) {
        // ── WebP: Convert entirely in the browser using WebCodecs (no server upload) ──
        const result = await convertWebPClientSide(file, cols, rows, format, maxFrameSize);

        setSpriteSheetPreview(result.previewUrl);
        setDownloadFilename(result.filename);

        const url = URL.createObjectURL(result.blob);
        setDownloadUrl(url);
      } else {
        // ── WebP: Fall back to server API route (for older browsers) ──
        const formData = new FormData();
        formData.append('file', file);
        formData.append('cols', cols.toString());
        formData.append('rows', rows.toString());
        formData.append('format', format);
        formData.append('maxFrameSize', maxFrameSize.toString());

        const response = await fetch('/api/convert', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Conversion failed');
        }

        const data = await response.json();

        if (data.previewUrl) {
          setSpriteSheetPreview(data.previewUrl);
        }
        if (data.filename) {
          setDownloadFilename(data.filename);
        }
        if (data.base64) {
          const byteCharacters = atob(data.base64);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const mimeType = format === 'png' ? 'image/png' : 'image/x-tga';
          const blob = new Blob([byteArray], { type: mimeType });
          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
        }
      }
    } catch (error) {
      console.error('Error converting file:', error);
      alert(`Failed to convert file to ${format.toUpperCase()}: ` + (error as Error).message);
    } finally {
      setConverting(false);
    }
  };

  const handleDownload = () => {
    if (downloadUrl) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = downloadFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-vulcan/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-forge-orange to-gold"></div>
        
        <h2 className="text-3xl font-headline font-bold text-bone-white mb-6 text-center">
          Upload Your Animated Image
        </h2>
        
        <div className="space-y-8">
          {/* File Upload Area */}
          <div className="relative group">
            <label
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${
                dragActive
                  ? 'border-forge-orange bg-vulcan shadow-[0_0_25px_rgba(255,107,0,0.25)] scale-[1.01]'
                  : 'border-white/20 bg-vulcan-light/50 hover:bg-vulcan-light group-hover:border-forge-orange/50'
              }`}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <span className="material-symbols-outlined text-4xl text-forge-orange mb-3">cloud_upload</span>
                <p className="mb-2 text-sm text-bone-white/80"><span className="font-semibold text-forge-orange">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-bone-white/50">GIF or WebP (Animated)</p>
              </div>
              <input type="file" className="hidden" accept="image/gif,image/webp" onChange={handleFileChange} />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Options */}
            <div className="space-y-6">
              {/* Output Format Selector */}
              <div>
                <label className="block text-sm font-label font-medium text-bone-white/90 mb-2">
                  Output Format
                </label>
                <div className="grid grid-cols-2 gap-2 bg-vulcan border border-white/10 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => handleFormatChange('tga')}
                    className={`py-2.5 px-4 rounded-md text-sm font-label font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                      format === 'tga'
                        ? 'bg-gradient-to-r from-forge-orange to-gold text-white shadow-lg shadow-forge-orange/20'
                        : 'text-bone-white/60 hover:text-bone-white hover:bg-white/5'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">filter_hdr</span>
                    TGA (.tga)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFormatChange('png')}
                    className={`py-2.5 px-4 rounded-md text-sm font-label font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                      format === 'png'
                        ? 'bg-gradient-to-r from-forge-orange to-gold text-white shadow-lg shadow-forge-orange/20'
                        : 'text-bone-white/60 hover:text-bone-white hover:bg-white/5'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">image</span>
                    PNG (.png)
                  </button>
                </div>
                <p className="mt-2 text-xs text-bone-white/60 font-mono">
                  {format === 'tga'
                    ? 'TGA is WoW’s native texture format, supporting 32-bit alpha and RLE compression.'
                    : 'PNG is standard, lossless, and compatible with modern layouts & WeakAuras.'}
                </p>
              </div>
              <div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-label font-medium text-bone-white/90 mb-2">
                      Columns
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={32}
                      value={cols}
                      onChange={(e) => {
                        setCols(Math.max(1, parseInt(e.target.value) || 1));
                        setDownloadUrl(null);
                        setSpriteSheetPreview(null);
                      }}
                      className="block w-full px-4 py-3 bg-white border border-white/20 rounded-lg text-black font-semibold focus:outline-none focus:ring-2 focus:ring-forge-orange focus:border-transparent appearance-none transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-label font-medium text-bone-white/90 mb-2">
                      Rows
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={32}
                      value={rows}
                      onChange={(e) => {
                        setRows(Math.max(1, parseInt(e.target.value) || 1));
                        setDownloadUrl(null);
                        setSpriteSheetPreview(null);
                      }}
                      className="block w-full px-4 py-3 bg-white border border-white/20 rounded-lg text-black font-semibold focus:outline-none focus:ring-2 focus:ring-forge-orange focus:border-transparent appearance-none transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-label font-medium text-bone-white/90 mb-2">
                      Max Frame Size
                    </label>
                    <select
                      value={maxFrameSize}
                      onChange={(e) => {
                        setMaxFrameSize(parseInt(e.target.value));
                        setDownloadUrl(null);
                        setSpriteSheetPreview(null);
                      }}
                      className="block w-full px-4 py-3 bg-white border border-white/20 rounded-lg text-black font-semibold focus:outline-none focus:ring-2 focus:ring-forge-orange focus:border-transparent transition-shadow"
                    >
                      <option value={64}>64 px</option>
                      <option value={128}>128 px</option>
                      <option value={256}>256 px</option>
                      <option value={512}>512 px</option>
                      <option value={0}>Original</option>
                    </select>
                  </div>
                </div>

                {detectedFrames !== null && (
                  <div className="mt-3 space-y-1.5">
                    <p className="text-xs text-forge-orange font-label font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">info</span>
                      Detected {detectedFrames} frame{detectedFrames === 1 ? '' : 's'}. Automatically set layout to {cols}x{rows} ({cols * rows} capacity).
                    </p>
                    {cols * rows < detectedFrames && (
                      <p className="text-xs text-red-400 font-label font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs text-red-400">warning</span>
                        Warning: Grid capacity ({cols * rows} frames) is less than detected frames ({detectedFrames}). Truncation will occur.
                      </p>
                    )}
                  </div>
                )}
                <p className="mt-2 text-xs text-bone-white/60 font-mono">Customize the number of grid columns and rows to arrange the spritesheet.</p>
              </div>

              <button
                onClick={handleConvert}
                disabled={!file || converting}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-forge-orange to-red-600 disabled:from-gray-600 disabled:to-gray-700 text-white font-label font-bold py-4 px-6 rounded-lg transition-all duration-300 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(255,107,0,0.4)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {converting ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">refresh</span>
                      Converting...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">manufacturing</span>
                      Generate {format.toUpperCase()} Sprite Sheet
                    </>
                  )}
                </span>
                {!converting && !file && (
                   <div className="absolute inset-0 bg-black/20 z-0"></div>
                )}
              </button>

              {downloadUrl && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-green-600/90 hover:bg-green-500 text-white font-label font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]"
                >
                  <span className="material-symbols-outlined">download</span>
                  Download {format.toUpperCase()} File
                </motion.button>
              )}
            </div>

            {/* Preview Section */}
            <div className="bg-vulcan-light/30 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center min-h-[250px]">
              {spriteSheetPreview ? (
                <>
                  <span className="text-sm font-label text-forge-orange mb-4 self-start font-bold">Generated Sprite Sheet:</span>
                  <div className="relative group w-full flex justify-center">
                    <div className="absolute -inset-1 bg-gradient-to-r from-forge-orange to-gold opacity-40 blur rounded-lg transition duration-500"></div>
                    <img
                      src={spriteSheetPreview}
                      alt="Generated Sprite Sheet Preview"
                      className="relative max-w-full max-h-[300px] object-contain rounded-md border border-white/10"
                    />
                  </div>
                </>
              ) : preview ? (
                <>
                  <span className="text-sm font-label text-bone-white/70 mb-4 self-start">Original Preview:</span>
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-forge-orange to-gold opacity-30 blur rounded-lg group-hover:opacity-60 transition duration-500"></div>
                    <img
                      src={preview}
                      alt="Animation Preview"
                      className="relative max-w-full max-h-[200px] object-contain rounded-md border border-white/10"
                    />
                  </div>
                </>
              ) : (
                <>
                  <span className="text-sm font-label text-bone-white/70 mb-4 self-start">Preview:</span>
                  <div className="flex flex-col items-center text-bone-white/30 h-full justify-center flex-1">
                    <span className="material-symbols-outlined text-5xl mb-2">image</span>
                    <p className="text-sm">No image selected</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
