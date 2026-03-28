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
        
        <article className="space-y-16 font-body text-lg text-bone-white/80 leading-relaxed">
          
          {/* SECTION 1 */}
          <section id="what-is-an-addon">
            <h2 className="text-3xl font-headline font-black text-gold-accent mb-6 uppercase tracking-tighter">
              Part 1: What is a World of Warcraft Addon & How Does It Help?
            </h2>
            <p className="mb-4">
              A World of Warcraft addon is a custom piece of software that modifies the game's default User Interface (UI). Since its initial launch, Blizzard Entertainment has allowed players to write scripts that interact with the game engine to display information, automate UI tasks, and completely overhaul how the game looks and feels.
            </p>
            <p className="mb-4">
              <strong>How do they help?</strong> At the highest levels of competitive play—whether it's pushing Mythic+ keystones, progressing in Mythic Raiding, or climbing the Gladiator arena brackets—information processing is the only bottleneck. The default UI is notoriously inefficient at communicating critical cooldowns, boss abilities, and buff timers.
            </p>
            <p>
              Custom addons bridge this gap. A perfectly engineered addon can track exact diminishing returns in PvP, alert a raid about a lethal mechanic 3 seconds before it happens, or automatically filter thousands of auction house undercuts in milliseconds. Simply put: Addons convert raw game data into an unfair, actionable tactical advantage.
            </p>
          </section>

          {/* SECTION 2 */}
          <section id="what-programming-language">
            <h2 className="text-3xl font-headline font-black text-gold-accent mb-6 uppercase tracking-tighter">
              Part 2: What Programming Language Does WoW Use?
            </h2>
            <p className="mb-4">
              To build a World of Warcraft addon, you only need to know two languages: <strong>Lua</strong> and <strong>XML</strong>. 
            </p>
            <ul className="list-disc pl-6 space-y-4 mb-4 text-bone-white/70">
              <li>
                <strong className="text-bone-white">Lua (The Brains):</strong> Lua is an incredibly fast, lightweight, and embeddable scripting language. It's the industry standard for game development. In WoW, Lua is used to write every single line of logic. If you want a button to heal someone when clicked, or a timer to track a buff, you write it in Lua.
              </li>
              <li>
                <strong className="text-bone-white">XML (The Structure):</strong> XML (eXtensible Markup Language) is used to draw the actual visual frames on the screen. While modern developers often create frames directly via Lua to save file space, understanding Blizzard's XML structure is crucial for interacting with the main UI engine.
              </li>
            </ul>
            <p>
              In addition to these languages, developers must utilize the <strong>WoW API</strong> (Application Programming Interface)—a massive, undocumented library of functions provided by Blizzard (like <code>UnitHealth("player")</code>) that allows your Lua code to ask the game engine for live information.
            </p>
          </section>

          {/* SECTION 3 */}
          <section id="step-by-step-tutorial">
            <h2 className="text-3xl font-headline font-black text-gold-accent mb-6 uppercase tracking-tighter">
              Part 3: Step-by-Step Tutorial — Coding Your First Addon
            </h2>
            <p className="mb-6">
              Ready to write your own addon? We are going to build a completely from-scratch addon that logs when the addon successfully loads into the game. No third-party libraries—just pure, raw Lua code.
            </p>

            <div className="space-y-8">
              {/* Step 3.1 */}
              <div>
                <h3 className="text-xl font-bold text-bone-white mb-3 flex items-center gap-4">
                  <span className="bg-gold-accent text-obsidian px-2 py-1 text-sm">STEP 01</span> 
                  The Folder & The TOC File
                </h3>
                <p className="mb-4">
                  First, navigate to your World of Warcraft installation directory, then into <code>_retail_\Interface\AddOns</code>. Create a new folder named exactly what you want your addon to be called (e.g., <code>ForgeTracker</code>).
                </p>
                <p className="mb-4">
                  Inside that folder, create a plain text file named exactly the same as the folder, but with a <code>.toc</code> extension (e.g., <code>ForgeTracker.toc</code>). This "Table of Contents" file literally tells WoW how to load your addon. Open it in VS Code and paste this:
                </p>
                <div className="bg-obsidian border border-bone-white/10 p-4 rounded-md font-mono text-sm text-bone-white/80 overflow-x-auto shadow-inner">
<pre>{`## Interface: 100206
## Title: ForgeTracker
## Notes: My very first custom WoW addon.
## Author: The Lav Forge Developer
## Version: 1.0.0

ForgeTracker.lua`}</pre>
                </div>
                <p className="mt-4 text-sm text-bone-white/60">
                  <em>Tip: The "Interface" number dictates which WoW patch this is for. You can find the current number in-game by typing <code>/dump select(4, GetBuildInfo())</code> into chat.</em>
                </p>
              </div>

              {/* Step 3.2 */}
              <div>
                <h3 className="text-xl font-bold text-bone-white mb-3 flex items-center gap-4">
                  <span className="bg-gold-accent text-obsidian px-2 py-1 text-sm">STEP 02</span> 
                  Writing the Lua Code
                </h3>
                <p className="mb-4">
                  Now, create the actual code file in the same folder. Name it <code>ForgeTracker.lua</code> (exactly as you referenced it at the bottom of the TOC file). Open it up, and let's write your first line of WoW Lua logic:
                </p>
                <div className="bg-obsidian border border-bone-white/10 p-4 rounded-md font-mono text-sm text-bone-white/80 overflow-x-auto shadow-inner">
<pre>{`-- This creates an invisible frame in the game to listen for events
local frame = CreateFrame("Frame")

-- We tell the frame to listen to the exact moment the player logs in
frame:RegisterEvent("PLAYER_LOGIN")

-- We assign a function to fire when that event triggers
frame:SetScript("OnEvent", function(self, event, ...)
    if event == "PLAYER_LOGIN" then
        print("|cffffcc00[ForgeTracker]|r successfully loaded!")
    end
end)`}</pre>
                </div>
              </div>

              {/* Step 3.3 */}
              <div>
                <h3 className="text-xl font-bold text-bone-white mb-3 flex items-center gap-4">
                  <span className="bg-gold-accent text-obsidian px-2 py-1 text-sm">STEP 03</span> 
                  Execution & Testing
                </h3>
                <p className="mb-4">
                  Save both files. Boot up World of Warcraft and click the "AddOns" button in the bottom left corner of the character select screen. You should see <strong>ForgeTracker</strong> listed! Make sure the checkbox is ticked, and enter the world.
                </p>
                <p>
                  Look at your chat box immediately upon loading. You will see a yellow message: <strong>[ForgeTracker] successfully loaded!</strong> Congratulations, you have successfully engineered a native WoW addon.
                </p>
              </div>
            </div>
          </section>

          {/* CTA / OUTRO */}
          <section className="mt-16 bg-obsidian border-2 border-gold-accent p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gold-accent/5 pointer-events-none" />
            <h2 className="text-2xl font-headline font-black text-bone-white uppercase mb-4 relative z-10">
              Need Something More Complex?
            </h2>
            <p className="text-bone-white/70 mb-8 relative z-10 max-w-2xl mx-auto">
              Printing text to a chatbox is easy. Building a localized, memory-efficient WeakAura suite with custom textures that flawlessly calculates diminishing returns across an entire 40-man raid? That's what we do.
            </p>
            <div className="flex justify-center relative z-10">
              <Link 
                href="/#request"
                className="bg-gold-accent text-obsidian font-headline text-2xl font-black uppercase tracking-tighter px-8 py-4 hover:bg-bone-white transition-colors duration-300 transform hover:scale-105"
              >
                Let Us Build It For You
              </Link>
            </div>
          </section>

        </article>
      </div>

      <Footer />
    </main>
  );
}
