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
    title: "WeakAuras vs Custom Addons: Which Do You Need?",
    description: "Compare WeakAuras and custom-built WoW addons side by side. Learn when to use each, their limitations, and which solution fits your gameplay needs.",
    canonical: `https://www.customwowaddon.com/${locale}/how-to-create-wow-addons/weakauras-vs-custom-addons`,
    datePublished: "2026-03-28T18:00:00Z",
  });
}

export default async function WeakAurasVsCustomAddons({ params }: { params: Promise<{ locale: Locale }> }) {
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
            title: "WeakAuras vs Custom Addons: Which Do You Need?",
            description: "Compare WeakAuras and custom-built WoW addons side by side. Learn when to use each, their limitations, and which solution fits your gameplay needs.",
            url: `${SITE_URL}/${locale}/how-to-create-wow-addons/weakauras-vs-custom-addons`,
            datePublished: "2026-03-28T18:00:00Z",
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
            { name: "WeakAuras vs Custom Addons", url: `${SITE_URL}/${locale}/how-to-create-wow-addons/weakauras-vs-custom-addons` },
          ])),
        }}
      />
      
      <div className="flex-grow container mx-auto px-6 max-w-3xl py-12">
        <Link href={`/${locale}/how-to-create-wow-addons`} className="font-label text-[#FF8000] text-xs uppercase tracking-widest hover:text-white transition-colors mb-8 inline-flex items-center">
          ← Back to Guides
        </Link>
        
        <header className="mb-8 border-b border-[#FF8000]/20 pb-8">
          <div className="font-mono text-[#FF8000]/60 mb-2">PART_04</div>
          <h1 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter text-bone-white leading-[1.1]">
            WeakAuras vs Custom Addons: Which Do You Need?
          </h1>
        </header>

        <div className="font-mono text-xs text-[#FF8000]/80 mb-6 tracking-widest uppercase border-l-2 border-[#FF8000] pl-4">
          Published: March 28, 2026
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#WeakAuras</span>
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#CustomAddons</span>
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#Comparison</span>
        </div>

        <article className="space-y-8 font-body text-lg text-bone-white/80 leading-relaxed">
          <p>
            If you have spent any time in the World of Warcraft addon community, you have heard of <a href="https://wago.io/" target="_blank" rel="noopener noreferrer" className="text-[#FF8000] font-bold hover:underline">WeakAuras</a>. It is arguably the single most powerful addon ever created for the game. But if WeakAuras can do so much, why would anyone need a fully custom addon? The answer is more nuanced than most players realize. This guide breaks down the strengths, limitations, and ideal use cases for both approaches.
          </p>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            1. What is WeakAuras?
          </h2>
          <p>
            <strong>WeakAuras</strong> is a framework addon that lets you build custom visual displays, alerts, and trackers without writing a standalone addon from scratch. You create &quot;auras&quot; through an in-game configuration panel. Each aura has a <strong>trigger</strong> (when should it activate?), a <strong>display</strong> (what should it look like?), and optional <strong>custom Lua code</strong> for advanced logic.
          </p>
          <p>
            For most players, WeakAuras is more than enough. Need a cooldown tracker for your trinket? A health bar that changes color at 30%? A timer for a boss mechanic? WeakAuras handles all of this out of the box. Community sites like <a href="https://wago.io/" target="_blank" rel="noopener noreferrer" className="text-[#FF8000] font-bold hover:underline">Wago.io</a> host thousands of pre-built auras you can import with one click.
          </p>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            2. What is a Custom Addon?
          </h2>
          <p>
            A <strong>custom addon</strong> is a fully standalone Lua application that runs inside the WoW client. Unlike a WeakAura, which lives as a configuration blob inside the WeakAuras framework, a custom addon has its own folder in your <code>Interface/AddOns</code> directory, its own <code>.toc</code> manifest file, and its own dedicated Lua source files.
          </p>
          <p>
            Custom addons have unrestricted access to the entire <a href="https://wowpedia.fandom.com/wiki/World_of_Warcraft_API" target="_blank" rel="noopener noreferrer" className="text-[#FF8000] font-bold hover:underline">WoW API</a>. They can create complex multi-window interfaces, manage persistent databases across sessions using <code>SavedVariables</code>, register slash commands, hook into Blizzard&apos;s native frame system, and communicate with other players running the same addon via hidden chat channel protocols.
          </p>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            3. Head-to-Head Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-[#FF8000]/30">
              <thead>
                <tr className="bg-[#FF8000]/10">
                  <th className="p-3 text-left text-[#FF8000] font-mono uppercase tracking-widest border-b border-[#FF8000]/30">Feature</th>
                  <th className="p-3 text-left text-[#FF8000] font-mono uppercase tracking-widest border-b border-[#FF8000]/30">WeakAuras</th>
                  <th className="p-3 text-left text-[#FF8000] font-mono uppercase tracking-widest border-b border-[#FF8000]/30">Custom Addon</th>
                </tr>
              </thead>
              <tbody className="text-bone-white/70">
                <tr className="border-b border-[#FF8000]/10">
                  <td className="p-3 font-bold text-bone-white">Setup Speed</td>
                  <td className="p-3">Minutes (import a string)</td>
                  <td className="p-3">Hours to days (requires Lua coding)</td>
                </tr>
                <tr className="border-b border-[#FF8000]/10">
                  <td className="p-3 font-bold text-bone-white">Lua Knowledge</td>
                  <td className="p-3">Optional (GUI-based)</td>
                  <td className="p-3">Required</td>
                </tr>
                <tr className="border-b border-[#FF8000]/10">
                  <td className="p-3 font-bold text-bone-white">Persistent Data</td>
                  <td className="p-3">Limited (stored inside WA&apos;s SavedVars)</td>
                  <td className="p-3">Full SavedVariables database</td>
                </tr>
                <tr className="border-b border-[#FF8000]/10">
                  <td className="p-3 font-bold text-bone-white">Performance</td>
                  <td className="p-3">Good for small auras, degrades with 100+ complex triggers</td>
                  <td className="p-3">Optimized, no framework overhead</td>
                </tr>
                <tr className="border-b border-[#FF8000]/10">
                  <td className="p-3 font-bold text-bone-white">UI Complexity</td>
                  <td className="p-3">Icons, bars, texts, models</td>
                  <td className="p-3">Unlimited (full frame API access)</td>
                </tr>
                <tr className="border-b border-[#FF8000]/10">
                  <td className="p-3 font-bold text-bone-white">Addon Communication</td>
                  <td className="p-3">Limited</td>
                  <td className="p-3">Full (hidden channel messaging between players)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-bone-white">Slash Commands</td>
                  <td className="p-3">No</td>
                  <td className="p-3">Yes (<code>/mycommand</code>)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            4. When to Use WeakAuras
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-bone-white/70">
            <li>You need a <strong>quick visual tracker</strong> for cooldowns, buffs, debuffs, or boss timers.</li>
            <li>You want to <strong>import something pre-built</strong> from Wago.io without writing any code.</li>
            <li>Your needs are <strong>display-focused</strong>: showing information on screen, playing sounds, or changing icon colors based on conditions.</li>
            <li>You are prototyping an idea and want to <strong>test it quickly</strong> before committing to a full addon build.</li>
          </ul>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            5. When You Need a Custom Addon
          </h2>
          <ul className="list-disc pl-6 space-y-3 text-bone-white/70">
            <li>You need <strong>persistent databases</strong> that track data across multiple play sessions (e.g., loot history, gold tracking, player notes).</li>
            <li>Your project requires <strong>complex multi-panel UI windows</strong> with scrollable lists, tabs, dropdown menus, and input fields.</li>
            <li>You need <strong>addon-to-addon communication</strong> between raid or guild members running the same tool.</li>
            <li>Performance is critical and you are running <strong>dozens of heavy triggers</strong> that would bog down WeakAuras.</li>
            <li>You want <strong>slash commands</strong>, minimap buttons, or integration with other addon frameworks like LibDataBroker.</li>
            <li>You are building something that simply <strong>does not exist yet</strong>: a custom casino system, an automated guild bank auditor, or a proprietary raid analytics dashboard.</li>
          </ul>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            6. The Best of Both Worlds
          </h2>
          <p>
            Here is what experienced developers know: <strong>you do not have to choose one or the other.</strong> The most powerful setups combine both. Use WeakAuras for fast, disposable, fight-specific displays that change every raid tier. Use a custom addon for the permanent backbone of your UI: data tracking, communication protocols, and complex interface panels that persist across expansions.
          </p>
          <div className="bg-[#FF8000]/10 border border-[#FF8000]/30 p-6 my-6 text-sm">
            <strong className="text-[#FF8000] block mb-2 uppercase tracking-widest font-mono">Pro Tip</strong>
            Many top guilds use a custom addon that feeds data to WeakAuras. The addon silently collects combat log data and stores it in SavedVariables, while WeakAuras reads that data and renders pretty displays. This gives you the raw power of an addon with the rapid iteration speed of WeakAuras.
          </div>
        </article>

        {/* CTA */}
        <section className="mt-16 bg-obsidian border border-[#FF8000]/40 p-8 text-center shadow-[0_0_30px_rgba(255,128,0,0.1)]">
          <h2 className="text-2xl font-headline font-black text-white uppercase mb-4">Need something WeakAuras can&apos;t do?</h2>
          <p className="text-white/60 mb-6 font-body text-sm max-w-xl mx-auto">
            When you hit the limits of WeakAuras, that is where we start. We build fully custom addons with persistent databases, addon communication, and complex UI systems that no aura string can replicate.
          </p>
          <Link href={`/${locale}/#request`} className="inline-block bg-[#FF8000] text-obsidian px-8 py-4 font-label tracking-widest uppercase font-bold text-sm hover:bg-white transition-colors duration-300 transform hover:scale-105">
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
