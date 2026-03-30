"use client";

function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute("href");
  if (href?.startsWith("#")) {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const capabilities = [
  {
    tag: "WEAKAURA_ENGINE",
    title: "PERSONAL WEAKAURAS",
    desc: "Custom WeakAuras designed specifically for your class, spec, and playstyle. Predictive cooldown tracking, intelligent resource bars, and raid-specific alerts you won't find anywhere else.",
    examples: ["Healer Triage Displays", "M+ Interrupt Rotations", "Boss Mechanic Trackers"],
  },
  {
    tag: "CASINO_SYSTEMS",
    title: "WOW CASINO ADDONS",
    desc: "Fully automated in-game casino systems that generate gold. Host games, manage bets, and track payouts — all through a clean, cheat-proof addon interface.",
    examples: ["Blackjack 13", "Blackjack 100", "Worn Troll Dice"],
  },
  {
    tag: "CUSTOM_TOOLS",
    title: "CAN'T FIND IT? WE BUILD IT.",
    desc: "CurseForge is an incredible platform packed with amazing free addons. But sometimes you dream of something truly unique that does not exist yet. That is where we come in: we build it from scratch, tailored precisely to your vision.",
    examples: ["Auction Snipers", "Guild Roster Tools", "Loot Distribution"],
    curseForgeLink: "https://www.curseforge.com/members/thelavforge/projects",
  },
  {
    tag: "UI_OVERHAULS",
    title: "FULL UI SUITES",
    desc: "Complete interface rebuilds from the ground up. We configure ElvUI, Plater, Details, and custom frames into a unified, minimal setup tuned for your resolution and role.",
    examples: ["Tank HUD Packages", "Healer Grid Layouts", "DPS Minimalist Setups"],
  },
];

export default function Capabilities() {
  return (
    <section className="p-6 md:p-24 border-b border-grid-border" id="capabilities">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="font-label text-gold-accent text-xs uppercase tracking-[0.3em] font-bold mb-4">
          [ WHAT WE BUILD ]
        </div>
        <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-bone-white font-black uppercase tracking-tighter leading-tight">
          LOOKING FOR SOMETHING
          <br />
          <span className="text-gold-accent">YOU CAN&apos;T FIND?</span>
        </h2>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-6">
          <p className="font-label text-bone-white/50 text-sm uppercase tracking-widest max-w-xl">
            We specialize in addons and systems that don&apos;t exist yet. If you can describe it, we can build it.
          </p>
          <a
            href="#request"
            onClick={smoothScroll}
            className="inline-flex items-center gap-3 bg-gold-accent text-obsidian px-8 py-4 font-headline font-black uppercase tracking-tighter hover:bg-white transition-colors group h-fit"
          >
            Start a Project
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>
      </div>

      {/* Capability Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {capabilities.map((cap) => (
          <div
            key={cap.tag}
            className="border border-gold-accent/15 bg-obsidian/40 backdrop-blur-sm p-8 md:p-10 group hover:border-gold-accent/50 transition-colors duration-300 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-accent/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
              {/* Tag */}
              <div className="font-mono text-gold-accent/40 text-[10px] uppercase tracking-widest mb-4">
                {cap.tag}
              </div>

              {/* Title */}
              <h3 className="font-headline text-bone-white text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
                {cap.title}
              </h3>

              {/* Description */}
              <p className="font-label text-bone-white/60 text-sm leading-relaxed mb-6">
                {cap.desc}
              </p>

              {/* Example Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {cap.examples.map((ex) => (
                  <span
                    key={ex}
                    className="font-label text-[10px] uppercase tracking-widest text-gold-accent/70 border border-gold-accent/20 px-3 py-1 bg-gold-accent/[0.04]"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 border-t border-gold-accent/10 pt-6 mt-auto flex items-center justify-between flex-wrap gap-4">
              <a
                href="#request"
                onClick={smoothScroll}
                className="font-headline text-xs font-black uppercase tracking-widest text-gold-accent hover:text-white transition-colors inline-flex items-center gap-2 group/link"
              >
                Request Custom Build
                <span className="material-symbols-outlined text-xs group-hover/link:translate-x-1 transition-transform">
                  east
                </span>
              </a>
              {cap.curseForgeLink && (
                <a
                  href={cap.curseForgeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-headline text-xs font-black uppercase tracking-widest text-[#FF8000] hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  Our CurseForge ↗
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
