"use client";

interface CapabilitiesProps {
  dict: any;
}

export default function Capabilities({ dict }: CapabilitiesProps) {
  const { capabilities } = dict;

  function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <section className="p-6 md:p-24 border-b border-grid-border" id="capabilities">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="font-label text-gold-accent text-xs uppercase tracking-[0.3em] font-bold mb-4">
          {capabilities.badge}
        </div>
        <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-bone-white font-black uppercase tracking-tighter leading-tight">
          {capabilities.title}
          <br />
          <span className="text-gold-accent">{capabilities.titleAccent}</span>
        </h2>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-6">
          <p className="font-label text-bone-white/50 text-sm uppercase tracking-widest max-w-xl">
            {capabilities.description}
          </p>
          <a
            href="#request"
            onClick={smoothScroll}
            className="inline-flex items-center gap-3 bg-gold-accent text-obsidian px-8 py-4 font-headline font-black uppercase tracking-tighter hover:bg-white transition-colors group h-fit"
          >
            {capabilities.cta}
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>
      </div>

      {/* Capability Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {capabilities.items.map((cap: any) => (
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
                {cap.examples.map((ex: string) => (
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
                {capabilities.requestLabel}
                <span className="material-symbols-outlined text-xs group-hover/link:translate-x-1 transition-transform">
                  east
                </span>
              </a>
              {cap.curseForgeLabel && (
                <a
                  href="https://www.curseforge.com/members/thelavforge/projects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-headline text-xs font-black uppercase tracking-widest text-[#FF8000] hover:text-white transition-colors inline-flex items-center gap-2"
                >
                  {cap.curseForgeLabel}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

