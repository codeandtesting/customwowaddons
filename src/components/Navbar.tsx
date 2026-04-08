"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, i18n } from "@/lib/i18n-config";

interface NavbarProps {
  dict: any;
  currentLocale: Locale;
}

export default function Navbar({ dict, currentLocale }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: dict.nav.services, href: `#services` },
    { label: dict.nav.expansions, href: `#versions` },
    { label: dict.nav.capabilities, href: `#capabilities` },
    { label: dict.nav.whyUs, href: `#why-us` },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, callback?: () => void) => {
    // Check if we are on the home page for this locale
    const isHomePage = pathname === `/${currentLocale}` || pathname === `/${currentLocale}/`;
    
    if (href.startsWith("#") && isHomePage) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    
    if (callback) callback();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#09090B]/80 backdrop-blur-md border-b border-[#333333]/50">
        <Link href={`/${currentLocale}`} onClick={() => setIsOpen(false)} className="text-2xl font-black text-[#F3EFE0] tracking-tighter font-headline uppercase leading-none hover:text-gold-accent transition-colors relative z-50">
          {dict.brand}
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                className={`font-label uppercase tracking-[-0.02em] text-[0.75rem] font-mono px-2 py-1 transition-colors duration-300 ${
                  pathname.includes(link.href)
                    ? "text-gold-accent border-b border-gold-accent" 
                    : "text-bone-white/70 hover:text-gold-accent"
                }`}
                href={`/${currentLocale}/${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-3 border-l border-white/10 pl-8 ml-4 h-6">
            {i18n.locales.map((locale) => (
              <Link
                key={locale}
                href={`/${locale}`}
                className={`text-[0.6rem] font-mono font-bold hover:text-gold-accent transition-colors ${
                  currentLocale === locale ? "text-gold-accent" : "text-bone-white/40"
                }`}
              >
                {locale.toUpperCase()}
              </Link>
            ))}
          </div>

          <Link 
            href={`/${currentLocale}/#request`} 
            onClick={(e) => handleNavClick(e, "#request")}
            className="font-label uppercase tracking-[-0.02em] text-[0.75rem] font-mono text-obsidian bg-gold-accent px-6 py-2 hover:bg-bone-white transition-colors duration-300 inline-block text-center font-bold"
          >
            {dict.nav.contact}
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
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={`/${currentLocale}/${link.href}`}
                onClick={(e) => handleNavClick(e, link.href, () => setIsOpen(false))}
                style={{ transitionDelay: `${isOpen ? 150 + i * 100 : 0}ms` }}
                className={`font-headline uppercase text-5xl font-black text-bone-white border-b border-[#333333]/50 pb-6 transform transition-all duration-700 ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div 
              className={`flex flex-wrap gap-4 mt-4 transition-all duration-700 delay-500 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              {i18n.locales.map((locale) => (
                <Link
                  key={locale}
                  href={`/${locale}`}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-mono font-bold ${
                    currentLocale === locale ? "text-gold-accent underline underline-offset-4" : "text-bone-white/40"
                  }`}
                >
                  {locale.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
          
          <Link 
            href={`/${currentLocale}/#request`} 
            onClick={(e) => handleNavClick(e, "#request", () => setIsOpen(false))}
            className={`font-label uppercase tracking-[0.1em] text-base font-mono text-obsidian bg-gold-accent w-full py-4 hover:bg-bone-white transition-all duration-700 text-center font-bold mt-auto ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: `${isOpen ? 150 + navLinks.length * 100 + 200 : 0}ms` }}
          >
            {dict.nav.contact}
          </Link>
        </div>
      </div>
    </>
  );
}


