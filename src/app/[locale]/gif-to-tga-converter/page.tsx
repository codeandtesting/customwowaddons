import { generatePageSEO } from "@/lib/seo";
import ConverterClient from "./ConverterClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import React from "react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return generatePageSEO({
    title: "Free GIF to TGA & PNG Sprite Sheet Converter | WoW Addons",
    description: "Easily convert animated GIFs and WebP images into TGA or PNG sprite sheets. Perfect for creating custom World of Warcraft addons, WeakAuras, and UI elements. 100% free online tool.",
    canonical: "https://www.customwowaddon.com/en/gif-to-tga-converter",
  });
}

export default async function GifToTgaConverterPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `https://www.customwowaddon.com/${locale}/gif-to-tga-converter#webapp`,
        "url": `https://www.customwowaddon.com/${locale}/gif-to-tga-converter`,
        "name": "Free GIF/WebP to TGA & PNG Sprite Sheet Converter",
        "description": "Convert animated GIFs and WebP images into WoW-ready TGA or PNG sprite sheets. Perfect for creating custom World of Warcraft addons, WeakAuras, and UI elements.",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires HTML5 Canvas. WebCodecs ImageDecoder support is optional for client-side WebP decoding.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "HowTo",
        "@id": `https://www.customwowaddon.com/${locale}/gif-to-tga-converter#howto`,
        "name": "How to Convert GIFs to WoW Spritesheets",
        "description": "Step-by-step instructions to convert animated GIF or WebP assets into TGA/PNG format for WoW Addons & WeakAuras.",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Upload File",
            "text": "Select or drag-and-drop an animated GIF or WebP file into the converter upload area."
          },
          {
            "@type": "HowToStep",
            "name": "Set Grid Layout",
            "text": "Specify the number of columns and rows matching the animation frames."
          },
          {
            "@type": "HowToStep",
            "name": "Scale Frames",
            "text": "Choose a maximum frame size (like 128px) to optimize file dimensions."
          },
          {
            "@type": "HowToStep",
            "name": "Download File",
            "text": "Select TGA or PNG format, click convert, and download the compressed spritesheet."
          }
        ]
      }
    ]
  };

  return (
    <main key={locale} className="relative z-[2] min-h-screen text-bone-white selection:bg-gold-accent selection:text-obsidian flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar dict={dict} currentLocale={locale} />
      
      <div className="pt-24 pb-16 flex-1 flex flex-col relative">
        {/* Decorative background elements */}
        <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-forge-orange/10 to-transparent pointer-events-none -z-10"></div>
        
        <div className="container mx-auto px-4 lg:px-8 flex-1 flex flex-col">
          <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forge-orange/10 border border-forge-orange/20 text-forge-orange font-label text-sm mb-6 shadow-[0_0_15px_rgba(255,107,0,0.2)]">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              Developer Tool
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold mb-6 tracking-tight drop-shadow-lg">
              GIF to <span className="text-forge-orange">TGA & PNG</span> Converter
            </h1>
            
            <p className="text-lg md:text-xl text-bone-white/80 font-body leading-relaxed max-w-2xl mx-auto">
              Transform your animated <strong className="text-bone-white">GIFs</strong> or <strong className="text-bone-white">WebP</strong> files into WoW-ready TGA or PNG sprite sheets in seconds. Ideal for custom UI elements and WeakAuras.
            </p>
          </div>

          {/* Client side interactive component */}
          <ConverterClient />

          {/* SEO / Info Section */}
          <div className="mt-20 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="bg-vulcan/60 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 bg-forge-orange/20 rounded-full flex items-center justify-center mb-4 text-forge-orange">
                <span className="material-symbols-outlined">speed</span>
              </div>
              <h3 className="text-xl font-headline font-bold mb-3 text-bone-white">Lightning Fast</h3>
              <p className="text-sm text-bone-white/70 leading-relaxed font-body">
                Converts right in the browser or via our edge functions. Zero waiting time to get your TGA or PNG files ready for implementation.
              </p>
            </div>
            
            <div className="bg-vulcan/60 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 bg-forge-orange/20 rounded-full flex items-center justify-center mb-4 text-forge-orange">
                <span className="material-symbols-outlined">grid_on</span>
              </div>
              <h3 className="text-xl font-headline font-bold mb-3 text-bone-white">Custom Grids</h3>
              <p className="text-sm text-bone-white/70 leading-relaxed font-body">
                Select the perfect grid size (up to 8x8) to map your animation frames seamlessly into a single optimized texture file.
              </p>
            </div>
            
            <div className="bg-vulcan/60 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 bg-forge-orange/20 rounded-full flex items-center justify-center mb-4 text-forge-orange">
                <span className="material-symbols-outlined">videogame_asset</span>
              </div>
              <h3 className="text-xl font-headline font-bold mb-3 text-bone-white">Multiple Formats</h3>
              <p className="text-sm text-bone-white/70 leading-relaxed font-body">
                Export to standard 32-bit RLE compressed <strong>TGA</strong> or lossless <strong>PNG</strong> format. Perfectly sized and compatible with World of Warcraft client versions.
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-4xl mx-auto prose prose-invert prose-orange bg-vulcan/40 p-8 rounded-2xl border border-white/10 relative z-10">
            <h2 className="font-headline text-2xl text-bone-white mb-4">How to use TGA & PNG Sprite Sheets in WoW</h2>
            <p className="text-bone-white/80 font-body mb-4 text-sm leading-relaxed">
              World of Warcraft's interface doesn't natively support animated GIFs. Instead, developers use a technique called "sprite sheets". This converter takes every frame of your animated GIF and places them into a grid within a single TGA or PNG image file.
            </p>
            <ol className="list-decimal list-inside text-bone-white/80 space-y-2 text-sm">
              <li>Upload your GIF and select a grid size (e.g., 5x5 for 25 frames).</li>
              <li>Choose your format (TGA or PNG) and download the generated sprite sheet.</li>
              <li>Place the file in your Addon directory.</li>
              <li>In your Lua code, create a Texture and use <code>SetTexture</code> with your file path (excluding the extension).</li>
              <li>Use <code>SetTexCoord</code> combined with an <code>OnUpdate</code> script or AnimationGroup to cycle through the grid coordinates.</li>
            </ol>
          </div>

          {/* FAQ Section for AI Search Crawlers */}
          <div className="mt-16 max-w-4xl mx-auto space-y-6 relative z-10 mb-16">
            <h2 className="font-headline text-3xl text-bone-white text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-vulcan/50 border border-white/10 p-6 rounded-xl">
                <h3 className="font-headline text-lg font-bold text-forge-orange mb-3">What is a WoW sprite sheet?</h3>
                <p className="text-sm text-bone-white/80 leading-relaxed font-body">
                  A WoW sprite sheet is a single image file containing multiple frames of an animation laid out in a grid. Since World of Warcraft does not support animated GIFs, developers use sprite sheets and cycle through grid coordinates using Lua scripts (<code>SetTexCoord</code>) or WeakAuras to display animations.
                </p>
              </div>
              <div className="bg-vulcan/50 border border-white/10 p-6 rounded-xl">
                <h3 className="font-headline text-lg font-bold text-forge-orange mb-3">Why use RLE-compressed TGA files in WoW?</h3>
                <p className="text-sm text-bone-white/80 leading-relaxed font-body">
                  Truevision TGA (.tga) with Run-Length Encoding (RLE) compression is World of Warcraft's native image format. RLE compression significantly reduces file size (often by 80% or more) without any loss in image quality, leading to faster addon loading times and lower in-game memory usage.
                </p>
              </div>
              <div className="bg-vulcan/50 border border-white/10 p-6 rounded-xl">
                <h3 className="font-headline text-lg font-bold text-forge-orange mb-3">What is the maximum texture size supported by WoW?</h3>
                <p className="text-sm text-bone-white/80 leading-relaxed font-body">
                  The maximum texture size recommended for a single World of Warcraft asset is 2048x2048 pixels. Furthermore, all textures must have dimensions that are a power of two (e.g., 64, 128, 256, 512, 1024, 2048) to render properly without stretching or display errors.
                </p>
              </div>
              <div className="bg-vulcan/50 border border-white/10 p-6 rounded-xl">
                <h3 className="font-headline text-lg font-bold text-forge-orange mb-3">Is PNG better than TGA for WeakAuras?</h3>
                <p className="text-sm text-bone-white/80 leading-relaxed font-body">
                  Both PNG and TGA formats are fully supported by modern WeakAuras and WoW clients. PNG is a standard web format that is easy to preview on your computer, while TGA is the engine's native format and is highly optimized. Both support transparent alpha channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer dict={dict} currentLocale={locale} />
    </main>
  );
}
