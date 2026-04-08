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
    title: "What Programming Language Does WoW Use?",
    description: "Discover the programming languages behind World of Warcraft addons. Compare Lua scripting and XML structures.",
    canonical: `https://www.customwowaddon.com/${locale}/how-to-create-wow-addons/programming-language`,
    datePublished: "2026-03-28T12:00:00Z",
  });
}

export default async function ProgrammingLanguage({ params }: { params: Promise<{ locale: Locale }> }) {
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
            title: "What Programming Language Does WoW Use?",
            description: "Discover the programming languages behind World of Warcraft addons. Compare Lua scripting and XML structures.",
            url: `${SITE_URL}/${locale}/how-to-create-wow-addons/programming-language`,
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
            { name: "Programming Language", url: `${SITE_URL}/${locale}/how-to-create-wow-addons/programming-language` },
          ])),
        }}
      />
      
      <div className="flex-grow container mx-auto px-6 max-w-3xl py-12">
        <Link href={`/${locale}/how-to-create-wow-addons`} className="font-label text-[#FF8000] text-xs uppercase tracking-widest hover:text-white transition-colors mb-8 inline-flex items-center">
          ← Back to Guides
        </Link>
        
        <header className="mb-8 border-b border-[#FF8000]/20 pb-8">
          <div className="font-mono text-[#FF8000]/60 mb-2">PART_02</div>
          <h1 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter text-bone-white leading-[1.1]">
            What Programming Language Does WoW Use?
          </h1>
        </header>

        <div className="font-mono text-xs text-[#FF8000]/80 mb-6 tracking-widest uppercase border-l-2 border-[#FF8000] pl-4">
          Published: March 28, 2026
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#Lua</span>
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#Programming</span>
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#WoWAPI</span>
        </div>

        <article className="space-y-8 font-body text-lg text-bone-white/80 leading-relaxed">
          <p>
            To engineer a functional World of Warcraft addon, you strictly only need to understand two languages: <strong>Lua</strong> and <strong>XML</strong>. However, the ecosystem inside the game engine is highly specialized.
          </p>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            1. Introduction to WoW Lua (The Brains)
          </h2>
          <p>
            <a href="https://www.lua.org/" target="_blank" rel="noopener noreferrer" className="text-[#FF8000] hover:underline font-bold">Lua</a> is an incredibly fast, lightweight, embeddable scripting language originally created in Brazil. It has become the gold standard for video game scripting.
          </p>
          <p>
            World of Warcraft runs on a heavily sandboxed, custom-modified version of <strong>Lua 5.1</strong>. Every mathematical calculation, combat event parser, and database lookup your addon performs happens in this environment. Because it is sandboxed, your Lua scripts cannot access the player's hard drive or run external executables—they only have access to the data the World of Warcraft client explicitly provides.
          </p>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            2. XML vs. Pure Lua Rendering (The Structure)
          </h2>
          <p>
            Since 2004, Blizzard has used <strong>XML (eXtensible Markup Language)</strong> to define the physical layout of the game's UI—windows, buttons, scrollbars, and minimaps. By creating an <code>.xml</code> file, you can construct a visual &quot;Frame&quot; that the game engine renders on the screen, and then bind it to a Lua script that dictates its behavior.
          </p>
          <div className="bg-[#FF8000]/10 border border-[#FF8000]/30 p-6 my-6 text-sm">
            <strong className="text-[#FF8000] block mb-2 uppercase tracking-widest font-mono">The Modern Engineering Shift</strong>
            While XML was standard practice in early WoW expansions, elite modern developers almost exclusively use <strong>Pure Lua</strong> for rendering. Instead of clunky XML files, developers use the native WoW API command <code>CreateFrame(&quot;Frame&quot;, ...)</code>. This allows for dynamic, runtime generation of UI elements, vastly reducing file size and improving memory efficiency.
          </div>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            3. The WoW API & FrameXML
          </h2>
          <p>
            Simply knowing how to write a generic Lua <code>for</code> loop is useless if you cannot interact with the game. This is where the <strong>WoW API (Application Programming Interface)</strong> comes into play.
          </p>
          <p>
            Blizzard exposes thousands of pre-built functions to the global environment (<code>_G</code>) that addons can call. Need to know a target's health? Call <code>UnitHealth(&quot;target&quot;)</code>. Want to delay an action? Use <code>C_Timer.After()</code>. Combining these API calls with event listeners—such as listening for <code>COMBAT_LOG_EVENT_UNFILTERED</code>—allows you to build incredibly complex raid tracking tools.
          </p>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            4. Essential Developer Resources
          </h2>
          <p>
            Because Blizzard's API is massive and largely undocumented internally, the addon development community relies on high-authority wikis and extraction hubs to survive. If you want to build addons, bookmark these immediately:
          </p>
          <ul className="list-disc pl-6 space-y-4 text-bone-white/70">
            <li>
              <a href="https://wowpedia.fandom.com/wiki/World_of_Warcraft_API" target="_blank" rel="noopener noreferrer" className="text-[#FF8000] font-bold hover:underline">Warcraft Wiki (Wowpedia) API Reference</a>: The holy grail. Contains crowdsourced documentation on nearly every single API function, UI event, and widget method available in the game.
            </li>
            <li>
              <a href="https://www.townlong-yak.com/framexml/live" target="_blank" rel="noopener noreferrer" className="text-[#FF8000] font-bold hover:underline">Townlong Yak FrameXML</a>: To truly understand how WoW works, you have to read Blizzard's own code. Townlong Yak constantly extracts and publishes the game's native UI source code so developers can study how the default interface is built.
            </li>
            <li>
              <a href="https://wago.io/" target="_blank" rel="noopener noreferrer" className="text-[#FF8000] font-bold hover:underline">Wago.io</a>: The central hub for sharing WeakAuras, ElvUI profiles, and custom Lua snippets. Studying advanced WeakAura triggers is a fantastic way to learn Lua combat logic.
            </li>
          </ul>
        </article>

        <section className="mt-16 bg-obsidian border border-[#FF8000]/40 p-8 text-center">
          <h2 className="text-2xl font-headline font-black text-white uppercase mb-4">Don&apos;t want to learn Lua?</h2>
          <p className="text-white/60 mb-6 font-body text-sm">Skip the countless hours of debugging. We code the Lua logic specifically tailored to your needs.</p>
          <Link href={`/${locale}/#request`} className="inline-block bg-[#FF8000] text-obsidian px-6 py-3 font-label tracking-widest uppercase font-bold text-sm hover:bg-white transition-colors">
            Request a Custom Build
          </Link>
        </section>
        {/* Cross-links */}
        <nav className="mt-12 border-t border-[#FF8000]/20 pt-8">
          <h3 className="font-label text-xs text-[#FF8000]/60 uppercase tracking-widest mb-6">Continue Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href={`/${locale}/how-to-create-wow-addons/what-is-an-addon`} className="group block border border-[#FF8000]/20 p-4 hover:border-[#FF8000] transition-colors">
              <div className="font-mono text-[#FF8000]/60 text-xs mb-1">PART_01</div>
              <div className="font-headline text-sm font-bold text-bone-white uppercase group-hover:text-[#FF8000] transition-colors">What is a WoW Addon & How Does It Help?</div>
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
