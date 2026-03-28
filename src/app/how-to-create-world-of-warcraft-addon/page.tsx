import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = generatePageSEO({
  title: "How to Create a World of Warcraft Addon: The Ultimate Guide",
  description:
    "Learn how to create a World of Warcraft addon from scratch. Discover what programming languages are used (Lua & XML) and write your first WoW addon step-by-step.",
  canonical: "https://www.customwowaddon.com/how-to-create-world-of-warcraft-addon",
});

export default function HowToCreateAddon() {
  return (
    <main className="relative z-[2] min-h-screen text-bone-white selection:bg-gold-accent selection:text-obsidian flex flex-col pt-24 bg-[#09090B]">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-6 max-w-4xl py-12">
        {/* Header */}
        <header className="mb-16 border-b border-gold-accent/20 pb-12">
          <div className="font-label text-gold-accent tracking-widest text-sm uppercase mb-4">
            Developer Guides · By The Lav Forge
          </div>
          <h1 className="font-headline text-5xl md:text-6xl font-black uppercase tracking-tighter text-bone-white leading-[1.1]">
            How to Create a World of Warcraft Addon
          </h1>
          <p className="mt-6 text-xl text-bone-white/60 font-body leading-relaxed max-w-2xl">
            A comprehensive, step-by-step masterclass on building custom UI modifications and scripts for World of Warcraft using Lua.
          </p>
        </header>

        <div className="mb-12 font-body text-lg text-bone-white/70 leading-relaxed max-w-3xl space-y-4">
          <p>
            Learning how to create a World of Warcraft addon can be overwhelming. Between understanding the WoW API, writing Lua scripts, structuring XML frames, and packaging everything into a TOC file, there is a lot of ground to cover. This guide series breaks the entire process down into three focused articles, each designed to take you from zero knowledge to a fully functional, custom-built addon.
          </p>
          <p>
            Whether you want to build a personal raid tracker, a custom auction house scanner, or a private PvP cooldown monitor, these guides will give you the foundation you need. Select an article below to get started.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Post 3 Card */}
          <Link href="/how-to-create-world-of-warcraft-addon/coding-tutorial" className="group block h-full">
            <div className="border border-[#FF8000]/40 bg-obsidian/60 backdrop-blur-sm p-8 h-full flex flex-col hover:border-[#FF8000] hover:bg-[#FF8000]/5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 font-mono text-xs text-[#FF8000]/60">PART_03</div>
              <h3 className="font-headline text-2xl font-black text-bone-white uppercase mb-4 mt-4 leading-tight group-hover:text-[#FF8000] transition-colors">
                Step-by-Step Tutorial: Writing Your First Addon
              </h3>
              <p className="font-body text-bone-white/60 text-sm leading-relaxed mb-6 flex-grow">
                A technical masterclass. We build an addon from absolute scratch using TOC files and raw Lua.
              </p>
              <div className="font-label text-[#FF8000] text-xs tracking-widest uppercase mt-auto flex items-center group-hover:translate-x-2 transition-transform">
                Read Guide 
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Post 2 Card */}
          <Link href="/how-to-create-world-of-warcraft-addon/programming-language" className="group block h-full">
            <div className="border border-[#FF8000]/40 bg-obsidian/60 backdrop-blur-sm p-8 h-full flex flex-col hover:border-[#FF8000] hover:bg-[#FF8000]/5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 font-mono text-xs text-[#FF8000]/60">PART_02</div>
              <h3 className="font-headline text-2xl font-black text-bone-white uppercase mb-4 mt-4 leading-tight group-hover:text-[#FF8000] transition-colors">
                What Programming Language Do You Need?
              </h3>
              <p className="font-body text-bone-white/60 text-sm leading-relaxed mb-6 flex-grow">
                Learn the differences between Lua logic and XML structural frames, and how the WoW API connects them.
              </p>
              <div className="font-label text-[#FF8000] text-xs tracking-widest uppercase mt-auto flex items-center group-hover:translate-x-2 transition-transform">
                Read Guide 
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Post 1 Card */}
          <Link href="/how-to-create-world-of-warcraft-addon/what-is-an-addon" className="group block h-full">
            <div className="border border-[#FF8000]/40 bg-obsidian/60 backdrop-blur-sm p-8 h-full flex flex-col hover:border-[#FF8000] hover:bg-[#FF8000]/5 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 font-mono text-xs text-[#FF8000]/60">PART_01</div>
              <h3 className="font-headline text-2xl font-black text-bone-white uppercase mb-4 mt-4 leading-tight group-hover:text-[#FF8000] transition-colors">
                What is a WoW Addon & How Does It Help?
              </h3>
              <p className="font-body text-bone-white/60 text-sm leading-relaxed mb-6 flex-grow">
                Discover the tactical advantages of custom interfaces in high-level Mythic+ and Arena brackets.
              </p>
              <div className="font-label text-[#FF8000] text-xs tracking-widest uppercase mt-auto flex items-center group-hover:translate-x-2 transition-transform">
                Read Guide 
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
