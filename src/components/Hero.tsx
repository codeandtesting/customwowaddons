"use client";
import { siteContent } from "@/data/mockData";
import FireParticles from "./FireParticles";
import Image from "next/image";

export default function Hero() {
  const { hero } = siteContent;
  return (
    <section className="relative min-h-[921px] flex flex-col pt-16 border-b border-grid-border overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <Image 
          className="w-full h-full object-cover grayscale brightness-50 contrast-125" 
          src={hero.backgroundImage} 
          alt="The Lav Forge - Custom WoW Addon Development Studio"
          fill
          priority
          sizes="100vw"
        />
      </div>

      <FireParticles />

      <div className="flex-grow flex flex-col justify-center px-6 md:px-12 relative z-10">
        <h1 className="font-headline text-6xl md:text-8xl lg:text-[7rem] leading-none font-black tracking-tighter text-bone-white uppercase mb-4 mt-8 md:mt-0">
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

      <div className="border-t border-grid-border flex flex-wrap justify-between items-center p-6 bg-obsidian/80 backdrop-blur-md relative z-10">
        <div className="flex gap-12 text-[10px] font-label uppercase tracking-[0.2em] text-gold-accent">
          {hero.secondaryLinks.map((link) => (
            <a key={link.label} className="hover:text-primary transition-colors" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden md:block text-[10px] font-label uppercase tracking-[0.2em] text-bone-white/40">
          {hero.badge}
        </div>
      </div>
    </section>
  );
}
