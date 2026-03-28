import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generatePageSEO, generateArticleSchema, generateBreadcrumbSchema, SITE_URL } from "@/lib/seo";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = generatePageSEO({
  title: "Step-by-Step Tutorial: Writing Your First Addon",
  description: "A technical masterclass. Build a World of Warcraft addon from absolute scratch using TOC files and raw Lua code.",
  canonical: "https://www.customwowaddon.com/how-to-create-world-of-warcraft-addon/coding-tutorial",
  datePublished: "2026-03-28T12:00:00Z",
});

export default function CodingTutorial() {
  return (
    <main className="relative z-[2] min-h-screen text-bone-white selection:bg-[#FF8000] selection:text-obsidian flex flex-col pt-24 bg-[#09090B]">
      <Navbar />

      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleSchema({
            title: "Step-by-Step Tutorial: Writing Your First Addon",
            description: "A technical masterclass. Build a World of Warcraft addon from absolute scratch using TOC files and raw Lua code.",
            url: `${SITE_URL}/how-to-create-world-of-warcraft-addon/coding-tutorial`,
            datePublished: "2026-03-28T12:00:00Z",
          })),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "How to Create a WoW Addon", url: `${SITE_URL}/how-to-create-world-of-warcraft-addon` },
            { name: "Coding Tutorial", url: `${SITE_URL}/how-to-create-world-of-warcraft-addon/coding-tutorial` },
          ])),
        }}
      />
      
      <div className="flex-grow container mx-auto px-6 max-w-3xl py-12">
        <Link href="/how-to-create-world-of-warcraft-addon" className="font-label text-[#FF8000] text-xs uppercase tracking-widest hover:text-white transition-colors mb-8 inline-flex items-center">
          ← Back to Guides
        </Link>
        
        <header className="mb-8 border-b border-[#FF8000]/20 pb-8">
          <div className="font-mono text-[#FF8000]/60 mb-2">PART_03</div>
          <h1 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter text-bone-white leading-[1.1]">
            Step-by-Step Tutorial: Writing Your First Addon
          </h1>
        </header>

        <div className="font-mono text-xs text-[#FF8000]/80 mb-6 tracking-widest uppercase border-l-2 border-[#FF8000] pl-4">
          Published: March 28, 2026
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#Tutorial</span>
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#LuaScripting</span>
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#GameDev</span>
        </div>

        <article className="space-y-12 font-body text-lg text-bone-white/80 leading-relaxed">
          <p className="mb-6">
            Ready to write your own addon? We are going to build a completely from-scratch addon that logs when the addon successfully loads into the game. No third-party libraries - just pure, raw Lua code.
          </p>

          <div className="space-y-12">
            {/* Step 3.1 */}
            <div>
              <h3 className="text-xl font-bold text-bone-white mb-4 flex items-center gap-4">
                <span className="bg-[#FF8000] text-obsidian px-2 py-1 text-sm font-mono tracking-tighter">STEP 01</span> 
                The Folder & The TOC File
              </h3>
              <p className="mb-4">
                First, navigate to your World of Warcraft installation directory, then into <code>_retail_\Interface\AddOns</code>. Create a new folder named exactly what you want your addon to be called (e.g., <code>ForgeTracker</code>).
              </p>
              <p className="mb-4">
                Inside that folder, create a plain text file named exactly the same as the folder, but with a <code>.toc</code> extension (e.g., <code>ForgeTracker.toc</code>). This &quot;Table of Contents&quot; file literally tells WoW how to load your addon. Open it in VS Code and paste this:
              </p>
              <div className="bg-obsidian border border-bone-white/10 p-6 rounded-md font-mono text-sm text-bone-white/80 overflow-x-auto shadow-inner">
<pre>{`## Interface: 100206
## Title: ForgeTracker
## Notes: My very first custom WoW addon.
## Author: The Lav Forge Developer
## Version: 1.0.0

ForgeTracker.lua`}</pre>
              </div>
              <p className="mt-4 text-sm text-[#FF8000]/80">
                <em>Tip: The &quot;Interface&quot; number dictates which WoW patch this is for. You can find the current number in-game by typing <code>/dump select(4, GetBuildInfo())</code> into chat.</em>
              </p>
            </div>

            {/* Step 3.2 */}
            <div>
              <h3 className="text-xl font-bold text-bone-white mb-4 flex items-center gap-4">
                <span className="bg-[#FF8000] text-obsidian px-2 py-1 text-sm font-mono tracking-tighter">STEP 02</span> 
                Writing the Lua Code
              </h3>
              <p className="mb-4">
                Now, create the actual code file in the same folder. Name it <code>ForgeTracker.lua</code> (exactly as you referenced it at the bottom of the TOC file). Open it up, and let&apos;s write your first line of WoW Lua logic:
              </p>
              <div className="bg-obsidian border border-bone-white/10 p-6 rounded-md font-mono text-sm text-bone-white/80 overflow-x-auto shadow-inner">
<pre className="text-green-400">{`-- This creates an invisible frame in the game to listen for events`}
<code className="text-blue-300">local</code> <code className="text-white">frame =</code> <code className="text-yellow-200">CreateFrame</code><code className="text-orange-300">("Frame")</code>

<code className="text-green-400">-- We tell the frame to listen to the exact moment the player logs in</code>
<code className="text-white">frame:RegisterEvent(</code><code className="text-orange-300">"PLAYER_LOGIN"</code><code className="text-white">)</code>

<code className="text-green-400">-- We assign a function to fire when that event triggers</code>
<code className="text-white">frame:SetScript(</code><code className="text-orange-300">"OnEvent"</code><code className="text-white">, </code><code className="text-blue-300">function</code><code className="text-white">(self, event, ...)</code>
    <code className="text-purple-400">if</code> <code className="text-white">event == </code><code className="text-orange-300">"PLAYER_LOGIN"</code> <code className="text-purple-400">then</code>
        <code className="text-yellow-200">print</code><code className="text-white">(</code><code className="text-orange-300">"|cffffcc00[ForgeTracker]|r successfully loaded!"</code><code className="text-white">)</code>
    <code className="text-purple-400">end</code>
<code className="text-blue-300">end</code><code className="text-white">)</code></pre>
              </div>
            </div>

            {/* Step 3.3 */}
            <div>
              <h3 className="text-xl font-bold text-bone-white mb-4 flex items-center gap-4">
                <span className="bg-[#FF8000] text-obsidian px-2 py-1 text-sm font-mono tracking-tighter">STEP 03</span> 
                Execution & Testing
              </h3>
              <p className="mb-4">
                Save both files. Boot up World of Warcraft and click the &quot;AddOns&quot; button in the bottom left corner of the character select screen. You should see <strong>ForgeTracker</strong> listed! Make sure the checkbox is ticked, and enter the world.
              </p>
              <p>
                Look at your chat box immediately upon loading. You will see a yellow message: <strong>[ForgeTracker] successfully loaded!</strong> Congratulations, you have successfully engineered a native WoW addon.
              </p>
            </div>
          </div>
        </article>

        <section className="mt-16 bg-obsidian border border-[#FF8000]/40 p-8 text-center shadow-[0_0_30px_rgba(255,128,0,0.1)]">
          <h2 className="text-2xl font-headline font-black text-white uppercase mb-4">Want to build something massive?</h2>
          <p className="text-white/60 mb-6 font-body text-sm max-w-xl mx-auto">
            Printing text to a chatbox is easy. Building a localized, memory-efficient WeakAura suite with custom textures that flawlessly calculates diminishing returns across an entire 40-man raid? That&apos;s what we do.
          </p>
          <Link href="/#request" className="inline-block bg-[#FF8000] text-obsidian px-8 py-4 font-label tracking-widest uppercase font-bold text-sm hover:bg-white transition-colors duration-300 transform hover:scale-105">
            Hire Our Engineers
          </Link>
        </section>
        {/* Cross-links */}
        <nav className="mt-12 border-t border-[#FF8000]/20 pt-8">
          <h3 className="font-label text-xs text-[#FF8000]/60 uppercase tracking-widest mb-6">Continue Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/how-to-create-world-of-warcraft-addon/what-is-an-addon" className="group block border border-[#FF8000]/20 p-4 hover:border-[#FF8000] transition-colors">
              <div className="font-mono text-[#FF8000]/60 text-xs mb-1">PART_01</div>
              <div className="font-headline text-sm font-bold text-bone-white uppercase group-hover:text-[#FF8000] transition-colors">What is a WoW Addon & How Does It Help?</div>
            </Link>
            <Link href="/how-to-create-world-of-warcraft-addon/programming-language" className="group block border border-[#FF8000]/20 p-4 hover:border-[#FF8000] transition-colors">
              <div className="font-mono text-[#FF8000]/60 text-xs mb-1">PART_02</div>
              <div className="font-headline text-sm font-bold text-bone-white uppercase group-hover:text-[#FF8000] transition-colors">What Programming Language Does WoW Use?</div>
            </Link>
          </div>
        </nav>
      </div>

      <Footer />
    </main>
  );
}
