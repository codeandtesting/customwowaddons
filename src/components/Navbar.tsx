"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, i18n } from "@/lib/i18n-config";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

interface NavbarProps {
  dict: any;
  currentLocale: Locale;
}

export default function Navbar({ dict, currentLocale }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const navbarBackground = useTransform(scrollY, [0, 100], ["rgba(9, 9, 11, 0.8)", "rgba(9, 9, 11, 0.95)"]);
  const navbarBlur = useTransform(scrollY, [0, 100], [12, 20]);

  const navLinks = [
    { label: dict.nav.services, href: `#services` },
    { label: dict.nav.expansions, href: `#versions` },
    { label: dict.nav.capabilities, href: `#capabilities` },
    { label: dict.nav.whyUs, href: `#why-us` },
    { label: "Spritesheet Converter", href: `gif-to-tga-converter` },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, callback?: () => void) => {
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

  const menuVariants = {
    closed: {
      x: "100%",
      opacity: 0
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const linkVariants = {
    closed: {
      x: 50,
      opacity: 0,
      scale: 0.9
    },
    open: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <>
      <motion.nav 
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 border-b border-[#333333]/50"
        style={{ 
          backgroundColor: navbarBackground,
          backdropFilter: `blur(${navbarBlur}px)`
        }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <Link 
            href={`/${currentLocale}`} 
            onClick={() => setIsOpen(false)} 
            className="text-2xl font-black text-[#F3EFE0] tracking-tighter font-headline uppercase leading-none hover:text-gold-accent transition-colors relative z-50 block"
          >
            {dict.brand}
          </Link>
        </motion.div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.label}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  className={`font-label uppercase tracking-[-0.02em] text-[0.75rem] font-mono px-2 py-1 transition-colors duration-300 block relative group ${
                    pathname.includes(link.href)
                      ? "text-gold-accent" 
                      : "text-bone-white/70 hover:text-gold-accent"
                  }`}
                  href={`/${currentLocale}/${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                  <motion.span 
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-accent group-hover:w-full transition-all duration-300"
                    initial={{ width: pathname.includes(link.href) ? "100%" : 0 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Language Switcher */}
          <div className="hidden flex items-center gap-3 border-l border-white/10 pl-8 ml-4 h-6">
            {i18n.locales.map((locale) => (
              <motion.div
                key={locale}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <Link
                  href={`/${locale}`}
                  prefetch={true}
                  className={`text-[0.6rem] font-mono font-bold hover:text-gold-accent transition-colors block ${
                    currentLocale === locale ? "text-gold-accent" : "text-bone-white/40"
                  }`}
                >
                  {locale.toUpperCase()}
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.a
            href={`/${currentLocale}/#request`}
            onClick={(e) => handleNavClick(e, "#request")}
            className="font-label uppercase tracking-[0.2em] text-[0.7rem] font-normal text-gold-accent border-2 border-gold-accent bg-gold-accent/10 px-5 py-2 hover:bg-gold-accent hover:text-obsidian hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 inline-block text-center relative overflow-hidden group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <span className="relative z-10">{dict.nav.contact}</span>
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <motion.button 
          className="md:hidden flex flex-col justify-center items-end w-8 h-8 space-y-1.5 focus:outline-none relative z-50"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.1 }}
        >
          <motion.span 
            className="block w-6 h-[2px] bg-bone-white"
            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span 
            className="block w-6 h-[2px] bg-bone-white"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span 
            className="block w-6 h-[2px] bg-bone-white"
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
          />
        </motion.button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-obsidian z-40 flex flex-col pt-24 px-6 md:hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="flex flex-col h-full pb-12">
              <div className="flex flex-col gap-6 mt-8 flex-grow">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    variants={linkVariants}
                    custom={i}
                  >
                    <motion.div
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href={`/${currentLocale}/${link.href}`}
                        onClick={(e) => handleNavClick(e, link.href, () => setIsOpen(false))}
                        className="font-headline uppercase text-5xl font-black text-bone-white border-b border-[#333333]/50 pb-6 block"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}

                <motion.div 
                  className="flex flex-wrap gap-4 mt-4"
                  variants={linkVariants}
                >
                  {i18n.locales.map((locale) => (
                    <motion.div
                      key={locale}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Link
                        href={`/${locale}`}
                        onClick={() => setIsOpen(false)}
                        className={`text-sm font-mono font-bold block ${
                          currentLocale === locale ? "text-gold-accent underline underline-offset-4" : "text-bone-white/40"
                        }`}
                      >
                        {locale.toUpperCase()}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              <motion.div
                variants={linkVariants}
              >
                <motion.a
                  href={`/${currentLocale}/#request`}
                  onClick={(e) => handleNavClick(e, "#request", () => setIsOpen(false))}
                  className="font-label uppercase tracking-[0.1em] text-base font-mono text-obsidian bg-gold-accent w-full py-4 hover:bg-bone-white transition-colors text-center font-bold mt-auto block relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span 
                    className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  />
                  <span className="relative z-10">{dict.nav.contact}</span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


