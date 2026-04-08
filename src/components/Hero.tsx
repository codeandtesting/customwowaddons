"use client";
import FireParticles from "./FireParticles";
import Image from "next/image";

interface HeroProps {
  dict: any;
}

export default function Hero({ dict }: HeroProps) {
  const { hero } = dict;
  return (
    <section className="relative min-h-[921px] flex flex-col pt-16 border-b border-grid-border overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <Image 
          className="w-full h-full object-cover grayscale brightness-50 contrast-125" 
          src="/hero_main.png" 
          alt={`${dict.brand} - Custom WoW Addon Development Studio`}
          fill
          priority
          sizes="100vw"
        />
      </div>

      <FireParticles />

      <div className="flex-grow flex flex-col justify-center px-6 md:px-12 relative z-10">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-8xl lg:text-[7rem] leading-[1.1] md:leading-none font-black tracking-tighter text-bone-white uppercase mb-4 mt-8 md:mt-0 break-words hyphens-auto">
          {hero.title.part1} <span className="text-gold-accent text-shadow-gold">{hero.title.accent1}</span><br />
          {hero.title.part2} <span className="text-gold-accent text-shadow-gold">{hero.title.accent2}</span><br />
          {hero.title.part3} <span className="text-gold-accent text-shadow-gold">{hero.title.accent3}</span>
        </h1>
        
        <div className="max-w-2xl mt-8">
          <p className="text-xl md:text-2xl text-bone-white/80 font-body leading-relaxed">
            {hero.description}
          </p>
        </div>
      </div>

      <div className="border-t border-grid-border flex flex-col md:flex-row gap-6 md:justify-between items-start md:items-center p-6 bg-obsidian/80 backdrop-blur-md relative z-10">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-12 text-[10px] font-label uppercase tracking-[0.2em] text-gold-accent">
          <a className="hover:text-primary transition-colors whitespace-nowrap" href="#services">
            {hero.links.whatWeDo}
          </a>
          <a className="hover:text-primary transition-colors whitespace-nowrap" href="#versions">
            {hero.links.versions}
          </a>
          <a className="hover:text-primary transition-colors whitespace-nowrap" href="#request">
            {hero.links.request}
          </a>
        </div>
        <div className="hidden md:block text-[10px] font-label uppercase tracking-[0.2em] text-bone-white/40">
          {hero.badge}
        </div>
      </div>
    </section>
  );
}

