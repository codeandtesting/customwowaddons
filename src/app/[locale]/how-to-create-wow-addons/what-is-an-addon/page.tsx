import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generatePageSEO, generateArticleSchema, generateBreadcrumbSchema, SITE_URL } from "@/lib/seo";
import Link from "next/link";
import Script from "next/script";
import { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageSEO({
    title: "What is a World of Warcraft Addon & How Does It Help?",
    description: "Learn how custom World of Warcraft addons provide a massive tactical advantage in competitive gameplay, Mythic+, and Arena brackets.",
    canonical: `https://www.customwowaddon.com/${locale}/how-to-create-wow-addons/what-is-an-addon`,
    datePublished: "2026-03-28T12:00:00Z",
  });
}

export default async function WhatIsAnAddon({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main className="relative z-[2] min-h-screen text-bone-white selection:bg-[#FF8000] selection:text-obsidian flex flex-col pt-24 bg-[#09090B]">
      <Navbar dict={dict} currentLocale={locale} />

      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleSchema({
            title: "What is a World of Warcraft Addon & How Does It Help?",
            description: "Learn how custom World of Warcraft addons provide a massive tactical advantage in competitive gameplay, Mythic+, and Arena brackets.",
            url: `${SITE_URL}/${locale}/how-to-create-wow-addons/what-is-an-addon`,
            datePublished: "2026-03-28T12:00:00Z",
          })),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/${locale}` },
            { name: "How to Create a WoW Addon", url: `${SITE_URL}/${locale}/how-to-create-wow-addons` },
            { name: "What is an Addon?", url: `${SITE_URL}/${locale}/how-to-create-wow-addons/what-is-an-addon` },
          ])),
        }}
      />
      
      <div className="flex-grow container mx-auto px-6 max-w-3xl py-12">
        <Link href={`/${locale}/how-to-create-wow-addons`} className="font-label text-[#FF8000] text-xs uppercase tracking-widest hover:text-white transition-colors mb-8 inline-flex items-center">
          ← Back to Guides
        </Link>
        
        <header className="mb-8 border-b border-[#FF8000]/20 pb-8">
          <div className="font-mono text-[#FF8000]/60 mb-2">PART_01</div>
          <h1 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter text-bone-white leading-[1.1]">
            What is a World of Warcraft Addon & How Does It Help?
          </h1>
        </header>

        <div className="font-mono text-xs text-[#FF8000]/80 mb-6 tracking-widest uppercase border-l-2 border-[#FF8000] pl-4">
          Published: March 28, 2026
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#WorldOfWarcraft</span>
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#Addons</span>
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#Gaming</span>
        </div>

        <article className="space-y-8 font-body text-lg text-bone-white/80 leading-relaxed">
          <p>
            A World of Warcraft addon is a custom piece of software that modifies the game&apos;s default User Interface (UI). Since its initial launch in 2004, <a href="https://www.blizzard.com/" target="_blank" rel="noopener noreferrer" className="text-[#FF8000] font-bold hover:underline">Blizzard Entertainment</a> has allowed players to write scripts that interact with the game engine to display information, automate UI tasks, and completely overhaul how the game looks and feels.
          </p>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            1. How Does the Default UI Fall Short?
          </h2>
          <p>
            The default World of Warcraft interface was designed to serve the widest possible audience, from casual levelers to first-time MMO players. Because of this, it prioritizes simplicity over information density. At the highest levels of competitive play (whether it is pushing Mythic+ keystones beyond +20, progressing through Mythic Raiding, or climbing the Gladiator arena brackets) information processing is the only bottleneck. The default UI is notoriously inefficient at communicating critical cooldowns, boss abilities, and buff timers in these high-pressure scenarios.
          </p>
          <p>
            For example, the standard raid frames do not display absorb shields, incoming heals from other players, or precise debuff durations. Arena players cannot see exact enemy cooldown timers or track diminishing returns on crowd-control effects. Auction House traders struggle with the default interface that lacks any automated scanning, price history, or undercut detection. These are not edge cases; they are the fundamental pain points that every serious player encounters.
          </p>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            2. How Custom Addons Bridge the Gap
          </h2>
          <p>
            Custom addons solve every one of these problems. A perfectly engineered addon can track exact diminishing returns in PvP, alert a raid about a lethal mechanic 3 seconds before it happens, or automatically filter thousands of auction house undercuts in milliseconds. Simply put: addons convert raw game data into an unfair, actionable tactical advantage.
          </p>
          <p>
            Here are the most common categories of addons used by competitive players:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-bone-white/70">
            <li><strong className="text-[#FF8000]">Boss Encounter Addons</strong> (e.g., Deadly Boss Mods, BigWigs): Display precise timers for boss abilities, show who is targeted by mechanics, and play audio alerts for lethal events.</li>
            <li><strong className="text-[#FF8000]">Unit Frame Replacements</strong> (e.g., ElvUI, ShadowedUnitFrames): Replace the default health bars for your party and raid with highly customizable, information-dense frames showing absorbs, HoTs, debuffs, and more.</li>
            <li><strong className="text-[#FF8000]">Action Bar Overhauls</strong> (e.g., Bartender4, Dominos): Let players rearrange, resize, and conditionally show/hide their keybinds for optimal muscle memory.</li>
            <li><strong className="text-[#FF8000]">Economy and AH Scanners</strong> (e.g., TradeSkillMaster, Auctionator): Automate the buying, posting, and undercutting of items on the Auction House. Professional gold farmers rely on these to process thousands of transactions per hour.</li>
            <li><strong className="text-[#FF8000]">Tracking and Alert Systems</strong> (e.g., <a href="https://wago.io/" target="_blank" rel="noopener noreferrer" className="text-[#FF8000] hover:underline">WeakAuras</a>): Build custom alerts for any in-game event. WeakAuras is by far the single most powerful addon framework ever built for WoW, capable of displaying complex visuals, playing sounds, and running advanced Lua logic.</li>
          </ul>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            3. The Private Addon Advantage
          </h2>
          <p>
            <a href="https://www.curseforge.com/wow/addons" target="_blank" rel="noopener noreferrer" className="text-[#FF8000] font-bold hover:underline">CurseForge</a> is an incredible platform and the backbone of the WoW addon ecosystem. Thousands of free, high-quality addons live there, and we are proud to <a href="https://www.curseforge.com/members/thelavforge/projects" target="_blank" rel="noopener noreferrer" className="text-[#FF8000] font-bold hover:underline">publish our own projects on CurseForge</a> as well. For most players, downloading from CurseForge is the perfect starting point.
          </p>
          <p>
            But sometimes you dream of something truly unique. Maybe you need an addon tuned to your exact playstyle, your guild&apos;s specific raid strategy, or a gold-making operation that nobody else has access to. That is where <strong>private, custom-built addons</strong> come in. A custom addon can be engineered to display only the exact information you need, in the exact position you want, with zero bloat and zero competition.
          </p>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            4. Are Addons Legal? Blizzard&apos;s Official Policy
          </h2>
          <p>
            Yes. Custom addons are 100% legal and officially supported by Blizzard. The <a href="https://wowpedia.fandom.com/wiki/AddOn" target="_blank" rel="noopener noreferrer" className="text-[#FF8000] font-bold hover:underline">WoW addon system</a> has been a core feature of the game since launch. Blizzard provides a public API that addons interact with, and the game client includes a dedicated AddOns button on the character select screen. The only restriction is that addons run inside a sandbox: they cannot interact with the operating system, read files, or automate actual gameplay inputs (like pressing keys or clicking). They can only read data from the game engine and display it to the player.
          </p>
          <div className="bg-[#FF8000]/10 border border-[#FF8000]/30 p-6 my-6 text-sm">
            <strong className="text-[#FF8000] block mb-2 uppercase tracking-widest font-mono">Key Takeaway</strong>
            Addons do not play the game for you. They give you better information, faster. In a game where split-second decisions determine whether your team wipes at 1% or earns a clean kill, that information advantage is everything.
          </div>
        </article>

        {/* CTA */}
        <section className="mt-16 bg-obsidian border border-[#FF8000]/40 p-8 text-center">
          <h2 className="text-2xl font-headline font-black text-white uppercase mb-4">Want the tactical advantage?</h2>
          <p className="text-white/60 mb-6 font-body text-sm">We build high-performance, private addons for elite players and guilds.</p>
          <Link href={`/${locale}/#request`} className="inline-block bg-[#FF8000] text-obsidian px-6 py-3 font-label tracking-widest uppercase font-bold text-sm hover:bg-white transition-colors">
            Request a Custom Build
          </Link>
        </section>

        {/* Cross-links */}
        <nav className="mt-12 border-t border-[#FF8000]/20 pt-8">
          <h3 className="font-label text-xs text-[#FF8000]/60 uppercase tracking-widest mb-6">Continue Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href={`/${locale}/how-to-create-wow-addons/programming-language`} className="group block border border-[#FF8000]/20 p-4 hover:border-[#FF8000] transition-colors">
              <div className="font-mono text-[#FF8000]/60 text-xs mb-1">PART_02</div>
              <div className="font-headline text-sm font-bold text-bone-white uppercase group-hover:text-[#FF8000] transition-colors">What Programming Language Does WoW Use?</div>
            </Link>
            <Link href={`/${locale}/how-to-create-wow-addons/coding-tutorial`} className="group block border border-[#FF8000]/20 p-4 hover:border-[#FF8000] transition-colors">
              <div className="font-mono text-[#FF8000]/60 text-xs mb-1">PART_03</div>
              <div className="font-headline text-sm font-bold text-bone-white uppercase group-hover:text-[#FF8000] transition-colors">Step-by-Step Tutorial: Writing Your First Addon</div>
            </Link>
          </div>
        </nav>
      </div>

      <Footer dict={dict} currentLocale={locale} />
    </main>
  );
}
