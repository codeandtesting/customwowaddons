"use client";

export default function RequestForm() {
  return (
    <section className="p-6 md:p-24 flex justify-center border-b border-grid-border" id="request">
      <div className="w-full max-w-4xl bg-obsidian/40 backdrop-blur-sm border-2 border-gold-accent p-12 md:p-16 relative text-center">
        {/* Terminal Tag */}
        <div className="absolute -top-4 -left-4 bg-gold-accent text-obsidian font-label px-4 py-1 text-xs uppercase tracking-widest font-bold">
          CUSTOM_BUILD_REQUEST
        </div>

        {/* Headline */}
        <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-bone-white font-black uppercase tracking-tighter leading-tight">
          WANT YOUR OWN
          <br />
          <span className="text-gold-accent">PERSONAL ADDON?</span>
        </h2>

        {/* Divider */}
        <div className="w-24 h-[2px] bg-gold-accent mx-auto my-8 opacity-60" />

        {/* Description */}
        <p className="font-label text-bone-white/70 text-sm md:text-base uppercase tracking-widest leading-relaxed max-w-2xl mx-auto">
          Open a ticket on our Discord. Tell us what you&apos;re struggling with
          <br className="hidden md:block" />
          and we&apos;ll build a solution tailored to your gameplay.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12">
          {[
            { step: "01", label: "JOIN", desc: "Enter the forge" },
            { step: "02", label: "OPEN TICKET", desc: "Describe your vision" },
            { step: "03", label: "WE BUILD", desc: "Get your addon" },
          ].map((item) => (
            <div key={item.step} className="border border-gold-accent/20 bg-obsidian/50 p-6 group hover:border-gold-accent/60 transition-colors">
              <div className="font-mono text-gold-accent/40 text-xs mb-2">
                STEP_{item.step}
              </div>
              <div className="font-headline text-bone-white text-xl font-black uppercase tracking-tight">
                {item.label}
              </div>
              <div className="font-label text-bone-white/50 text-xs uppercase tracking-widest mt-2">
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 w-full">
          {/* Primary Discord Button */}
          <a
            href="https://discord.gg/yESkPhPBZn"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-4 w-full py-7 bg-[#5865F2] text-white font-headline text-3xl md:text-4xl font-black uppercase tracking-tighter hover:bg-[#4752C4] transition-colors duration-200 cursor-pointer border-none group"
          >
            {/* Discord Icon */}
            <svg
              className="w-9 h-9 fill-current shrink-0 group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
            </svg>
            JOIN DISCORD & OPEN TICKET
          </a>

          {/* Secondary Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* Fiverr Button */}
            <a
              href="https://pro.fiverr.com/s/bdERDgY"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-4 border-2 border-[#1dbf73] bg-[#1dbf73]/10 text-[#1dbf73] font-headline text-sm md:text-base font-black uppercase tracking-widest hover:bg-[#1dbf73] hover:text-obsidian hover:shadow-[0_0_20px_rgba(29,191,115,0.4)] transition-all duration-300 cursor-pointer group"
            >
              {/* Custom Fiverr SVG Icon */}
              <svg 
                className="w-5 h-5 mr-3 shrink-0 group-hover:scale-110 transition-transform" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="currentColor" className="fill-current" />
                <path d="M12.5 12V8h-2.5V6.5A1.5 1.5 0 0 1 11.5 5h1V3h-1.5A3.5 3.5 0 0 0 7.5 6.5V8H5v2.5h2.5v7h2.5v-7h2.5z" fill="white" className="group-hover:fill-obsidian transition-colors" />
                <circle cx="14" cy="5.5" r="1.5" fill="white" className="group-hover:fill-obsidian transition-colors" />
              </svg>
              Secure Fiverr Pro
            </a>
            
            {/* Typeform Button */}
            <a
              href="https://form.typeform.com/to/fYENAzD1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full py-4 border-2 border-[#FF8000] bg-[#FF8000]/10 text-[#FF8000] font-headline text-sm md:text-base font-black uppercase tracking-widest hover:bg-[#FF8000] hover:text-obsidian hover:shadow-[0_0_20px_rgba(255,128,0,0.4)] transition-all duration-300 cursor-pointer group"
            >
              <svg 
                className="w-5 h-5 mr-3 shrink-0 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all group-hover:text-obsidian" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Use Web Form
            </a>
          </div>
        </div>

        {/* Subtext */}
        <p className="font-label text-bone-white/30 text-[10px] uppercase tracking-[0.3em] mt-6">
          PRIVATE · SECURE · AVERAGE RESPONSE: &lt;2 HOURS
        </p>
      </div>
    </section>
  );
}
