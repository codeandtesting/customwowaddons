import { generatePageSEO } from "@/lib/seo";
import ConverterClient from "./ConverterClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import React from "react";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  return generatePageSEO({
    title: "Free GIF to TGA Sprite Sheet Converter for WoW Addons",
    description: "Easily convert animated GIFs and WebP images into TGA sprite sheets. Perfect for creating custom World of Warcraft addons, WeakAuras, and UI elements. 100% free online tool.",
    canonical: "https://www.customwowaddon.com/en/gif-to-tga-converter",
  });
}

export default async function GifToTgaConverterPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main key={locale} className="relative z-[2] min-h-screen text-bone-white selection:bg-gold-accent selection:text-obsidian flex flex-col">
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
              GIF to <span className="text-forge-orange">TGA</span> Converter
            </h1>
            
            <p className="text-lg md:text-xl text-bone-white/80 font-body leading-relaxed max-w-2xl mx-auto">
              Transform your animated <strong className="text-bone-white">GIFs</strong> or <strong className="text-bone-white">WebP</strong> files into WoW-ready TGA sprite sheets in seconds. Ideal for custom UI elements and WeakAuras.
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
                Converts right in the browser or via our edge functions. Zero waiting time to get your TGA files ready for implementation.
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
              <h3 className="text-xl font-headline font-bold mb-3 text-bone-white">Native WoW Format</h3>
              <p className="text-sm text-bone-white/70 leading-relaxed font-body">
                Exports bottom-left origin, 32-bit TGA formats using advanced <strong>RLE compression</strong>. These files are incredibly tiny and load identically to BLP textures in WoW natively—no external BLP converters needed!
              </p>
            </div>
          </div>

          <div className="mt-16 max-w-4xl mx-auto prose prose-invert prose-orange bg-vulcan/40 p-8 rounded-2xl border border-white/10 relative z-10 mb-16">
            <h2 className="font-headline text-2xl text-bone-white mb-4">How to use TGA Sprite Sheets in WoW</h2>
            <p className="text-bone-white/80 font-body mb-4 text-sm leading-relaxed">
              World of Warcraft's interface doesn't natively support animated GIFs. Instead, developers use a technique called "sprite sheets". This converter takes every frame of your animated GIF and places them into a grid within a single TGA image file.
            </p>
            <ol className="list-decimal list-inside text-bone-white/80 space-y-2 text-sm">
              <li>Upload your GIF and select a grid size (e.g., 5x5 for 25 frames).</li>
              <li>Download the generated TGA file and place it in your Addon directory.</li>
              <li>In your Lua code, create a Texture and use <code>SetTexture</code> with your TGA.</li>
              <li>Use <code>SetTexCoord</code> combined with an <code>OnUpdate</code> script or AnimationGroup to cycle through the grid coordinates.</li>
            </ol>
          </div>
        </div>
      </div>
      
      <Footer dict={dict} currentLocale={locale} />
    </main>
  );
}
