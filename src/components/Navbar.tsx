"use client";
import { useState } from "react";
import { siteContent } from "@/data/mockData";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, callback?: () => void) => {
    // If the link is an anchor and we are currently on the home page, smooth scroll
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.substring(1); // Extract "#section" from "/#section"
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    // If we are NOT on the home page, we let Next.js <Link> handle the routing to "/"
    
    if (callback) callback();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#09090B]/80 backdrop-blur-md border-b border-[#333333]/50">
        <Link href="/" onClick={() => setIsOpen(false)} className="text-2xl font-black text-[#F3EFE0] tracking-tighter font-headline uppercase leading-none hover:text-gold-accent transition-colors relative z-50">
          {siteContent.brand}
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8">
            {siteContent.navLinks.map((link) => (
              <Link
                key={link.label}
                className={`font-label uppercase tracking-[-0.02em] text-[0.75rem] font-mono px-2 py-1 transition-colors duration-300 ${
                  link.label === "SERVICES" 
                    ? "text-gold-accent border-b border-gold-accent" 
                    : "text-bone-white/70 hover:text-gold-accent"
                }`}
                href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                onClick={(e) => handleNavClick(e, link.href.startsWith("#") ? `/${link.href}` : link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link 
            href="/#request" 
            onClick={(e) => handleNavClick(e, "/#request")}
            className="font-label uppercase tracking-[-0.02em] text-[0.75rem] font-mono text-obsidian bg-gold-accent px-6 py-2 hover:bg-bone-white transition-colors duration-300 inline-block text-center font-bold"
          >
            CONTACT
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden flex flex-col justify-center items-end w-8 h-8 space-y-1.5 focus:outline-none relative z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`block w-6 h-[2px] bg-bone-white transform transition duration-300 ${isOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
          <span className={`block w-6 h-[2px] bg-bone-white transition duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-[2px] bg-bone-white transform transition duration-300 ${isOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-obsidian z-40 flex flex-col pt-24 px-6 md:hidden transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pb-12">
          <div className="flex flex-col gap-6 mt-8 flex-grow">
            {siteContent.navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                onClick={(e) => handleNavClick(e, link.href.startsWith("#") ? `/${link.href}` : link.href, () => setIsOpen(false))}
                style={{ transitionDelay: `${isOpen ? 150 + i * 100 : 0}ms` }}
                className={`font-headline uppercase text-5xl font-black text-bone-white border-b border-[#333333]/50 pb-6 transform transition-all duration-700 ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <Link 
            href="/#request" 
            onClick={(e) => handleNavClick(e, "/#request", () => setIsOpen(false))}
            className={`font-label uppercase tracking-[0.1em] text-base font-mono text-obsidian bg-gold-accent w-full py-4 hover:bg-bone-white transition-all duration-700 text-center font-bold mt-auto ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: `${isOpen ? 150 + siteContent.navLinks.length * 100 : 0}ms` }}
          >
            CONTACT
          </Link>
        </div>
      </div>
    </>
  );
}

