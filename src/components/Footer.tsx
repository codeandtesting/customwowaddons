"use client";
import { siteContent } from "@/data/mockData";

export default function Footer() {
  const { footer, brand } = siteContent;
  return (
    <footer className="w-full border-t border-[#333333]/50 py-8 px-6 flex flex-col md:flex-row justify-between items-center bg-[#09090B]/80 backdrop-blur-md">
      <div className="text-lg font-bold text-[#F3EFE0] font-headline uppercase mb-4 md:mb-0">
        {brand}
      </div>
      
      <div className="flex gap-8 mb-4 md:mb-0 text-[10px] font-label uppercase tracking-widest text-[#F3EFE0]">
        {footer.links.map((link) => (
          <a key={link.label} className="hover:text-[#CCFF00] transition-none" href={link.href}>
            {link.label}
          </a>
        ))}
      </div>

      <div className="font-label text-[10px] uppercase tracking-widest text-[#F3EFE0]/40">
        {footer.copyright}
      </div>
    </footer>
  );
}
