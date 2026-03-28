import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = generatePageSEO({
  title: "What is a World of Warcraft Addon & How Does It Help?",
  description: "Learn how custom World of Warcraft addons provide a massive tactical advantage in competitive gameplay, Mythic+, and Arena brackets.",
  canonical: "https://www.customwowaddon.com/how-to-create-world-of-warcraft-addon/what-is-an-addon",
});

export default function WhatIsAnAddon() {
  return (
    <main className="relative z-[2] min-h-screen text-bone-white selection:bg-[#FF8000] selection:text-obsidian flex flex-col pt-24 bg-[#09090B]">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-6 max-w-3xl py-12">
        <Link href="/how-to-create-world-of-warcraft-addon" className="font-label text-[#FF8000] text-xs uppercase tracking-widest hover:text-white transition-colors mb-8 inline-flex items-center">
          ← Back to Guides
        </Link>
        
        <header className="mb-12 border-b border-[#FF8000]/20 pb-8">
          <div className="font-mono text-[#FF8000]/60 mb-2">PART_01</div>
          <h1 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter text-bone-white leading-[1.1]">
            What is a World of Warcraft Addon & How Does It Help?
          </h1>
        </header>

        <article className="space-y-6 font-body text-lg text-bone-white/80 leading-relaxed">
          <p>
            A World of Warcraft addon is a custom piece of software that modifies the game's default User Interface (UI). Since its initial launch, Blizzard Entertainment has allowed players to write scripts that interact with the game engine to display information, automate UI tasks, and completely overhaul how the game looks and feels.
          </p>
          <p>
            <strong>How do they help?</strong> At the highest levels of competitive play—whether it's pushing Mythic+ keystones, progressing in Mythic Raiding, or climbing the Gladiator arena brackets—information processing is the only bottleneck. The default UI is notoriously inefficient at communicating critical cooldowns, boss abilities, and buff timers.
          </p>
          <p>
            Custom addons bridge this gap. A perfectly engineered addon can track exact diminishing returns in PvP, alert a raid about a lethal mechanic 3 seconds before it happens, or automatically filter thousands of auction house undercuts in milliseconds. Simply put: Addons convert raw game data into an unfair, actionable tactical advantage.
          </p>
        </article>

        <section className="mt-16 bg-obsidian border border-[#FF8000]/40 p-8 text-center">
          <h2 className="text-2xl font-headline font-black text-white uppercase mb-4">Want the tactical advantage?</h2>
          <p className="text-white/60 mb-6 font-body text-sm">We build high-performance, private addons for elite players and guilds.</p>
          <Link href="/form" className="inline-block bg-[#FF8000] text-obsidian px-6 py-3 font-label tracking-widest uppercase font-bold text-sm hover:bg-white transition-colors">
            Request a Custom Build
          </Link>
        </section>
      </div>

      <Footer />
    </main>
  );
}
