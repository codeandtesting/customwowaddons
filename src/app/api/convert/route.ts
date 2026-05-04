import { NextRequest, NextResponse } from 'next/server';
import { createCanvas, loadImage } from 'canvas';
import { parseGIF, decompressFrames } from 'gifuct-js';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const gridSize = parseInt(formData.get('gridSize') as string) || 5;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileType = file.type;

    let canvas: ReturnType<typeof createCanvas>;

    if (fileType === 'image/gif') {
      // Handle GIF - extract frames and arrange in grid
      const gifData = parseGIF(arrayBuffer);
      const frames = decompressFrames(gifData, true);

      if (frames.length === 0) {
        return NextResponse.json({ error: 'No frames found in GIF' }, { status: 400 });
      }

      // Use the overall GIF canvas dimensions (not frame patch dimensions)
      const frameWidth = gifData.lsd.width;
      const frameHeight = gifData.lsd.height;

      // Calculate sprite sheet dimensions
      const spriteSheetWidth = frameWidth * gridSize;
      const spriteSheetHeight = frameHeight * gridSize;

      // Create canvas for sprite sheet
      canvas = createCanvas(spriteSheetWidth, spriteSheetHeight);
      const ctx = canvas.getContext('2d');

      // Arrange frames in grid
      for (let i = 0; i < Math.min(frames.length, gridSize * gridSize); i++) {
        const frame = frames[i];
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;

        // Create a temporary canvas for each frame
        const frameCanvas = createCanvas(frameWidth, frameHeight);
        const frameCtx = frameCanvas.getContext('2d');
        
        // Create ImageData from frame patch
        const imageData = frameCtx.createImageData(frameWidth, frameHeight);
        
        // gifuct-js returns RGBA data, need to convert to canvas format
        const patch = frame.patch;
        const dims = frame.dims;
        
        // Handle disposal method and patch dimensions
        for (let y = 0; y < dims.height; y++) {
          for (let x = 0; x < dims.width; x++) {
            const srcIndex = (y * dims.width + x) * 4;
            const dstIndex = ((y + dims.top) * frameWidth + (x + dims.left)) * 4;
            
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
        
        // Draw frame to sprite sheet
        ctx.drawImage(frameCanvas, col * frameWidth, row * frameHeight);
      }
    } else if (fileType === 'image/webp') {
      // Handle WebP - check if animated and extract frames
      const metadata = await sharp(buffer).metadata();
      
      if (metadata.pages && metadata.pages > 1) {
        // Animated WebP - extract frames
        const frames: Buffer[] = [];
        
        for (let i = 0; i < Math.min(metadata.pages, gridSize * gridSize); i++) {
          // Extract frame and convert to PNG (canvas doesn't support WebP directly)
          const frameBuffer = await sharp(buffer, { page: i }).png().toBuffer();
          frames.push(frameBuffer);
        }
        
        if (frames.length === 0) {
          return NextResponse.json({ error: 'No frames found in WebP' }, { status: 400 });
        }
        
        // Get frame dimensions from first frame
        const firstFrameMetadata = await sharp(frames[0]).metadata();
        const frameWidth = firstFrameMetadata.width || 256;
        const frameHeight = firstFrameMetadata.height || 256;
        
        // Calculate sprite sheet dimensions
        const spriteSheetWidth = frameWidth * gridSize;
        const spriteSheetHeight = frameHeight * gridSize;
        
        // Create canvas for sprite sheet
        canvas = createCanvas(spriteSheetWidth, spriteSheetHeight);
        const ctx = canvas.getContext('2d');
        
        // Arrange frames in grid
        for (let i = 0; i < frames.length; i++) {
          const row = Math.floor(i / gridSize);
          const col = i % gridSize;
          
          const frameImage = await loadImage(frames[i]);
          ctx.drawImage(frameImage, col * frameWidth, row * frameHeight);
        }
      } else {
        // Static WebP - convert single image to TGA
        const image = await loadImage(buffer);
        canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
      }
    } else {
      return NextResponse.json({ error: 'Unsupported file type. Use GIF or WebP.' }, { status: 400 });
    }

    // Convert to TGA format
    const tgaBuffer = canvasToTGA(canvas);
    
    // Generate PNG preview
    const previewUrl = canvas.toDataURL('image/png');
    const tgaBase64 = tgaBuffer.toString('base64');

    return NextResponse.json({
      previewUrl,
      tgaBase64,
      filename: file.name.replace(/\.(gif|webp)$/i, '.tga'),
    });
  } catch (error) {
    console.error('Error converting file:', error);
    return NextResponse.json({ error: 'Failed to convert file: ' + (error as Error).message }, { status: 500 });
  }
}

// Convert canvas to TGA format with RLE Compression
function canvasToTGA(canvas: ReturnType<typeof createCanvas>): Buffer {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const width = canvas.width;
  const height = canvas.height;
  
  // TGA header (RLE Truecolor, 32-bit RGBA)
  const header = Buffer.alloc(18);
  header.writeUInt8(0, 0); // ID length
  header.writeUInt8(0, 1); // Color map type
  header.writeUInt8(10, 2); // Image type (10 = RLE Truecolor)
  header.writeUInt16LE(0, 3); // Color map origin
  header.writeUInt16LE(0, 5); // Color map length
  header.writeUInt8(0, 7); // Color map entry size
  header.writeUInt16LE(0, 8); // X origin
  header.writeUInt16LE(0, 10); // Y origin
  header.writeUInt16LE(width, 12); // Width
  header.writeUInt16LE(height, 14); // Height
  header.writeUInt8(32, 16); // Pixel depth (32 bits)
  header.writeUInt8(0, 17); // Image descriptor (0 = bottom-left origin)

  const chunks: Buffer[] = [header];

  // Process line by line
  for (let y = 0; y < height; y++) {
    const srcY = height - 1 - y; // Flip Y for bottom-left origin
    let x = 0;
    
    while (x < width) {
      let runLength = 1;
      
      const getPixel = (cx: number) => {
        const idx = (srcY * width + cx) * 4;
        return { r: data[idx], g: data[idx+1], b: data[idx+2], a: data[idx+3] };
      };
      
      const p = getPixel(x);
      const isMatch = (p1: any, p2: any) => p1.r === p2.r && p1.g === p2.g && p1.b === p2.b && p1.a === p2.a;

      // Count matching pixels for RLE packet
      while (x + runLength < width && runLength < 128) {
        if (isMatch(p, getPixel(x + runLength))) {
          runLength++;
        } else {
          break;
        }
      }

      if (runLength > 1) {
        // Run-length packet
        const packet = Buffer.alloc(5);
        packet.writeUInt8(128 | (runLength - 1), 0); // 1st bit = 1 for RLE
        packet.writeUInt8(p.b, 1);
        packet.writeUInt8(p.g, 2);
        packet.writeUInt8(p.r, 3);
        packet.writeUInt8(p.a, 4);
        chunks.push(packet);
        x += runLength;
      } else {
        // Raw packet
        let rawCount = 1;
        while (x + rawCount < width && rawCount < 128) {
          if (!isMatch(getPixel(x + rawCount - 1), getPixel(x + rawCount))) {
            rawCount++;
          } else {
            rawCount--; // Last pixel starts a new run
            break;
          }
        }
        
        const packet = Buffer.alloc(1 + rawCount * 4);
        packet.writeUInt8(rawCount - 1, 0); // 1st bit = 0 for Raw
        for (let i = 0; i < rawCount; i++) {
          const px = getPixel(x + i);
          packet.writeUInt8(px.b, 1 + i * 4);
          packet.writeUInt8(px.g, 1 + i * 4 + 1);
          packet.writeUInt8(px.r, 1 + i * 4 + 2);
          packet.writeUInt8(px.a, 1 + i * 4 + 3);
        }
        chunks.push(packet);
        x += rawCount;
      }
    }
  }

  return Buffer.concat(chunks);
}
