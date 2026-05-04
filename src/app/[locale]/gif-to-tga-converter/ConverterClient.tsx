'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ConverterClient() {
  const [file, setFile] = useState<File | null>(null);
  const [gridSize, setGridSize] = useState<number>(5);
  const [converting, setConverting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [downloadFilename, setDownloadFilename] = useState<string>('output.tga');
  const [preview, setPreview] = useState<string | null>(null);
  const [spriteSheetPreview, setSpriteSheetPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && (selectedFile.type === 'image/gif' || selectedFile.type === 'image/webp')) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
      setDownloadUrl(null);
      setSpriteSheetPreview(null);
    }
  };

  const handleConvert = async () => {
    if (!file) return;

    setConverting(true);
    setDownloadUrl(null);
    setSpriteSheetPreview(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('gridSize', gridSize.toString());

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const data = await response.json();
      
      // Show the generated sprite sheet preview
      if (data.previewUrl) {
        setSpriteSheetPreview(data.previewUrl);
      }
      
      if (data.filename) {
        setDownloadFilename(data.filename);
      }
      
      // Decode base64 TGA to Blob
      if (data.tgaBase64) {
        const byteCharacters = atob(data.tgaBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/x-tga' });
        const url = URL.createObjectURL(blob);
        setDownloadUrl(url);
      }
    } catch (error) {
      console.error('Error converting GIF:', error);
      alert('Failed to convert GIF to TGA');
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
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/20 rounded-xl cursor-pointer bg-vulcan-light/50 hover:bg-vulcan-light transition-all duration-300 group-hover:border-forge-orange/50">
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
              <div>
                <label className="block text-sm font-label font-medium text-bone-white/90 mb-2">
                  Sprite Sheet Grid Size
                </label>
                <div className="relative">
                  <select
                    value={gridSize}
                    onChange={(e) => setGridSize(parseInt(e.target.value))}
                    className="block w-full px-4 py-3 bg-vulcan border border-white/10 rounded-lg text-bone-white focus:outline-none focus:ring-2 focus:ring-forge-orange focus:border-transparent appearance-none transition-shadow"
                  >
                    <option value={2}>2x2 (4 frames)</option>
                    <option value={3}>3x3 (9 frames)</option>
                    <option value={4}>4x4 (16 frames)</option>
                    <option value={5}>5x5 (25 frames)</option>
                    <option value={6}>6x6 (36 frames)</option>
                    <option value={8}>8x8 (64 frames)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-bone-white/50 pointer-events-none">expand_more</span>
                </div>
                <p className="mt-2 text-xs text-bone-white/60 font-mono">Select a grid that accommodates all animation frames.</p>
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
                      Generate TGA Sprite Sheet
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
                  Download TGA File
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
