import { NextRequest, NextResponse } from 'next/server';
import { createCanvas, loadImage } from 'canvas';
import { parseGIF, decompressFrames } from 'gifuct-js';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const cols = parseInt(formData.get('cols') as string) || parseInt(formData.get('gridSize') as string) || 5;
    const rows = parseInt(formData.get('rows') as string) || parseInt(formData.get('gridSize') as string) || 5;
    const maxFrameSize = parseInt(formData.get('maxFrameSize') as string) || 0;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileType = file.type;

    const format = (formData.get('format') as string) || 'tga';

    let canvas: ReturnType<typeof createCanvas>;

    if (fileType === 'image/gif') {
      // Handle GIF - extract frames and arrange in grid
      const gifData = parseGIF(arrayBuffer);
      const frames = decompressFrames(gifData, true);

      if (frames.length === 0) {
        return NextResponse.json({ error: 'No frames found in GIF' }, { status: 400 });
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

      // Calculate sprite sheet dimensions
      const spriteSheetWidth = frameWidth * cols;
      const spriteSheetHeight = frameHeight * rows;

      // Create canvas for sprite sheet
      canvas = createCanvas(spriteSheetWidth, spriteSheetHeight);
      const ctx = canvas.getContext('2d');

      // Arrange frames in grid
      for (let i = 0; i < Math.min(frames.length, cols * rows); i++) {
        const frame = frames[i];
        const row = Math.floor(i / cols);
        const col = i % cols;

        // Create a temporary canvas for each frame at original size
        const frameCanvas = createCanvas(origFrameWidth, origFrameHeight);
        const frameCtx = frameCanvas.getContext('2d');
        
        // Create ImageData from frame patch
        const imageData = frameCtx.createImageData(origFrameWidth, origFrameHeight);
        
        // gifuct-js returns RGBA data, need to convert to canvas format
        const patch = frame.patch;
        const dims = frame.dims;
        
        // Handle disposal method and patch dimensions
        for (let y = 0; y < dims.height; y++) {
          for (let x = 0; x < dims.width; x++) {
            const srcIndex = (y * dims.width + x) * 4;
            const dstIndex = ((y + dims.top) * origFrameWidth + (x + dims.left)) * 4;
            
            // Handle transparency (if alpha is 0, skip)
            if (patch[srcIndex + 3] > 0) {
              imageData.data[dstIndex] = patch[srcIndex];     // R
              imageData.data[dstIndex + 1] = patch[srcIndex + 1]; // G
              imageData.data[dstIndex + 2] = patch[srcIndex + 2]; // B
              imageData.data[dstIndex + 3] = patch[srcIndex + 3]; // A
            }
          }
        }
        
        frameCtx.putImageData(imageData, 0, 0);
        
        // Draw frame to sprite sheet (scaling if needed)
        ctx.drawImage(
          frameCanvas,
          0,
          0,
          origFrameWidth,
          origFrameHeight,
          col * frameWidth,
          row * frameHeight,
          frameWidth,
          frameHeight
        );
      }
    } else if (fileType === 'image/webp') {
      // Handle WebP - check if animated and extract frames
      const metadata = await sharp(buffer).metadata();
      
      if (metadata.pages && metadata.pages > 1) {
        // Animated WebP - extract frames
        const frames: Buffer[] = [];
        
        for (let i = 0; i < Math.min(metadata.pages, cols * rows); i++) {
          // Extract frame and convert to PNG (canvas doesn't support WebP directly)
          const frameBuffer = await sharp(buffer, { page: i }).png().toBuffer();
          frames.push(frameBuffer);
        }
        
        if (frames.length === 0) {
          return NextResponse.json({ error: 'No frames found in WebP' }, { status: 400 });
        }
        
        // Get frame dimensions from first frame
        const firstFrameMetadata = await sharp(frames[0]).metadata();
        const origFrameWidth = firstFrameMetadata.width || 256;
        const origFrameHeight = firstFrameMetadata.height || 256;
        
        let frameWidth = origFrameWidth;
        let frameHeight = origFrameHeight;

        if (maxFrameSize > 0 && (frameWidth > maxFrameSize || frameHeight > maxFrameSize)) {
          const ratio = Math.min(maxFrameSize / frameWidth, maxFrameSize / frameHeight);
          frameWidth = Math.round(frameWidth * ratio);
          frameHeight = Math.round(frameHeight * ratio);
        }

        // Calculate sprite sheet dimensions
        const spriteSheetWidth = frameWidth * cols;
        const spriteSheetHeight = frameHeight * rows;
        
        // Create canvas for sprite sheet
        canvas = createCanvas(spriteSheetWidth, spriteSheetHeight);
        const ctx = canvas.getContext('2d');
        
        // Arrange frames in grid
        for (let i = 0; i < frames.length; i++) {
          const row = Math.floor(i / cols);
          const col = i % cols;
          
          const frameImage = await loadImage(frames[i]);
          ctx.drawImage(
            frameImage,
            0,
            0,
            origFrameWidth,
            origFrameHeight,
            col * frameWidth,
            row * frameHeight,
            frameWidth,
            frameHeight
          );
        }
      } else {
        // Static WebP - convert single image to TGA
        const image = await loadImage(buffer);
        let frameWidth = image.width;
        let frameHeight = image.height;

        if (maxFrameSize > 0 && (frameWidth > maxFrameSize || frameHeight > maxFrameSize)) {
          const ratio = Math.min(maxFrameSize / frameWidth, maxFrameSize / frameHeight);
          frameWidth = Math.round(frameWidth * ratio);
          frameHeight = Math.round(frameHeight * ratio);
        }

        canvas = createCanvas(frameWidth, frameHeight);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, frameWidth, frameHeight);
      }
    } else {
      return NextResponse.json({ error: 'Unsupported file type. Use GIF or WebP.' }, { status: 400 });
    }

    // Generate PNG preview
    const previewUrl = canvas.toDataURL('image/png');
    
    let base64 = '';
    let filename = '';

    const baseName = file.name.replace(/\.(gif|webp)$/i, '');
    if (format === 'png') {
      const pngBuffer = canvas.toBuffer('image/png');
      base64 = pngBuffer.toString('base64');
      filename = `${baseName}_col-${cols}_row-${rows}.png`;
    } else {
      const tgaBuffer = canvasToTGA(canvas);
      base64 = tgaBuffer.toString('base64');
      filename = `${baseName}_col-${cols}_row-${rows}.tga`;
    }

    return NextResponse.json({
      previewUrl,
      base64,
      tgaBase64: format === 'tga' ? base64 : undefined,
      filename,
    });
  } catch (error) {
    console.error('Error converting file:', error);
    return NextResponse.json({ error: 'Failed to convert file: ' + (error as Error).message }, { status: 500 });
  }
}

// Convert canvas to TGA format (RLE Compressed Truecolor)
function canvasToTGA(canvas: ReturnType<typeof createCanvas>): Buffer {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const width = canvas.width;
  const height = canvas.height;
  const numPixels = width * height;

  const bgraData = Buffer.alloc(numPixels * 4);
  for (let i = 0; i < data.length; i += 4) {
    bgraData[i] = data[i + 2];     // B
    bgraData[i + 1] = data[i + 1]; // G
    bgraData[i + 2] = data[i];     // R
    bgraData[i + 3] = data[i + 3]; // A
  }

  const maxCompressedSize = 18 + bgraData.length + Math.ceil(numPixels / 128);
  const outBuffer = Buffer.alloc(maxCompressedSize);

  // Write TGA header for RLE Truecolor (10)
  outBuffer.writeUInt8(0, 0); // ID length
  outBuffer.writeUInt8(0, 1); // Color map type
  outBuffer.writeUInt8(10, 2); // Image type (10 = RLE Truecolor)
  outBuffer.writeUInt16LE(0, 3); // Color map origin
  outBuffer.writeUInt16LE(0, 5); // Color map length
  outBuffer.writeUInt8(0, 7); // Color map entry size
  outBuffer.writeUInt16LE(0, 8); // X origin
  outBuffer.writeUInt16LE(0, 10); // Y origin
  outBuffer.writeUInt16LE(width, 12); // Width
  outBuffer.writeUInt16LE(height, 14); // Height
  outBuffer.writeUInt8(32, 16); // Pixel depth (32 bits)
  outBuffer.writeUInt8(0x28, 17); // Image descriptor (top-left, 8 attribute bits)

  let outIdx = 18;
  let pixelIdx = 0;

  while (pixelIdx < numPixels) {
    let runLen = 1;
    const startIdx = pixelIdx * 4;
    const b = bgraData[startIdx];
    const g = bgraData[startIdx + 1];
    const r = bgraData[startIdx + 2];
    const a = bgraData[startIdx + 3];

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
      outBuffer.writeUInt8(0x80 | (runLen - 1), outIdx++);
      outBuffer.writeUInt8(b, outIdx++);
      outBuffer.writeUInt8(g, outIdx++);
      outBuffer.writeUInt8(r, outIdx++);
      outBuffer.writeUInt8(a, outIdx++);
      pixelIdx += runLen;
    } else {
      let rawLen = 1;
      while (pixelIdx + rawLen < numPixels && rawLen < 128) {
        const currentIdx = (pixelIdx + rawLen) * 4;
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

      outBuffer.writeUInt8(rawLen - 1, outIdx++);
      for (let i = 0; i < rawLen; i++) {
        const idx = (pixelIdx + i) * 4;
        outBuffer.writeUInt8(bgraData[idx], outIdx++);
        outBuffer.writeUInt8(bgraData[idx + 1], outIdx++);
        outBuffer.writeUInt8(bgraData[idx + 2], outIdx++);
        outBuffer.writeUInt8(bgraData[idx + 3], outIdx++);
      }
      pixelIdx += rawLen;
    }
  }

  return outBuffer.subarray(0, outIdx);
}
