import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generatePageSEO } from "@/lib/seo";
import Link from "next/link";

export const metadata: Metadata = generatePageSEO({
  title: "What Programming Language Does WoW Use?",
  description: "Discover the programming languages behind World of Warcraft addons. Compare Lua scripting and XML structures.",
  canonical: "https://www.customwowaddon.com/how-to-create-world-of-warcraft-addon/programming-language",
  datePublished: "2026-03-28T12:00:00Z",
});

export default function ProgrammingLanguage() {
  return (
    <main className="relative z-[2] min-h-screen text-bone-white selection:bg-[#FF8000] selection:text-obsidian flex flex-col pt-24 bg-[#09090B]">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-6 max-w-3xl py-12">
        <Link href="/how-to-create-world-of-warcraft-addon" className="font-label text-[#FF8000] text-xs uppercase tracking-widest hover:text-white transition-colors mb-8 inline-flex items-center">
          ← Back to Guides
        </Link>
        
        <header className="mb-8 border-b border-[#FF8000]/20 pb-8">
          <div className="font-mono text-[#FF8000]/60 mb-2">PART_02</div>
          <h1 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter text-bone-white leading-[1.1]">
            What Programming Language Does WoW Use?
          </h1>
        </header>

        <div className="font-mono text-xs text-[#FF8000]/80 mb-10 tracking-widest uppercase border-l-2 border-[#FF8000] pl-4">
          Published: March 28, 2026
        </div>

        <article className="space-y-6 font-body text-lg text-bone-white/80 leading-relaxed">
          <p>
            To build a World of Warcraft addon, you only need to know two languages: <strong>Lua</strong> and <strong>XML</strong>. 
          </p>
          <ul className="list-disc pl-6 space-y-4 text-bone-white/70">
            <li>
              <strong className="text-[#FF8000]">Lua (The Brains):</strong> Lua is an incredibly fast, lightweight, and embeddable scripting language. It's the industry standard for game development. In WoW, Lua is used to write every single line of logic. If you want a button to heal someone when clicked, or a timer to track a buff, you write it in Lua.
            </li>
            <li>
              <strong className="text-[#FF8000]">XML (The Structure):</strong> XML (eXtensible Markup Language) is used to draw the actual visual frames on the screen. While modern developers often create frames directly via Lua to save file space, understanding Blizzard's XML structure is crucial for interacting with the main UI engine.
            </li>
          </ul>
          <p>
            In addition to these languages, developers must utilize the <strong>WoW API</strong> (Application Programming Interface)—a massive, undocumented library of functions provided by Blizzard (like <code>UnitHealth("player")</code>) that allows your Lua code to ask the game engine for live information.
          </p>
        </article>

        <section className="mt-16 bg-obsidian border border-[#FF8000]/40 p-8 text-center">
          <h2 className="text-2xl font-headline font-black text-white uppercase mb-4">Don't want to learn Lua?</h2>
          <p className="text-white/60 mb-6 font-body text-sm">Skip the countless hours of debugging. We code the Lua logic specifically tailored to your needs.</p>
          <Link href="/#request" className="inline-block bg-[#FF8000] text-obsidian px-6 py-3 font-label tracking-widest uppercase font-bold text-sm hover:bg-white transition-colors">
            Request a Custom Build
          </Link>
        </section>
      </div>

      <Footer />
    </main>
  );
}
