"use client";
import { motion, useScroll, useTransform } from "framer-motion";

interface CapabilitiesProps {
  dict: any;
}

export default function Capabilities({ dict }: CapabilitiesProps) {
  const { capabilities } = dict;
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      rotateX: 10,
      scale: 0.95
    },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.1
      }
    })
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <motion.section 
      className="p-6 md:p-24 border-b border-grid-border" 
      id="capabilities"
      style={{ y }}
    >
      {/* Section Header */}
      <motion.div 
        className="max-w-6xl mx-auto mb-16"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="font-label text-gold-accent text-xs uppercase tracking-[0.3em] font-bold mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {capabilities.badge}
        </motion.div>
        <motion.h2 
          className="font-headline text-4xl md:text-5xl lg:text-6xl text-bone-white font-black uppercase tracking-tighter leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {capabilities.title}
          <br />
          <motion.span 
            className="text-gold-accent inline-block"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ duration: 0.2 }}
          >
            {capabilities.titleAccent}
          </motion.span>
        </motion.h2>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-6">
          <motion.p 
            className="font-label text-bone-white/50 text-sm uppercase tracking-widest max-w-xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {capabilities.description}
          </motion.p>
          <motion.a
            href="#request"
            onClick={smoothScroll}
            className="inline-flex items-center gap-3 bg-gold-accent text-obsidian px-8 py-4 font-headline font-black uppercase tracking-tighter hover:bg-white transition-colors group h-fit relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span 
              className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
            />
            <span className="relative z-10">{capabilities.cta}</span>
            <motion.span 
              className="material-symbols-outlined text-sm relative z-10"
              whileHover={{ x: 6, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              arrow_forward
            </motion.span>
          </motion.a>
        </div>
      </motion.div>

      {/* Capability Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: 1000 }}>
        {capabilities.items.map((cap: any, i: number) => (
          <motion.div
            key={cap.tag}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              borderColor: "rgba(255, 193, 7, 0.5)",
              boxShadow: "0 20px 40px rgba(212, 175, 55, 0.1)"
            }}
            transition={{ duration: 0.3 }}
            className="border border-gold-accent/15 bg-obsidian/40 backdrop-blur-sm p-8 md:p-10 group relative overflow-hidden flex flex-col justify-between cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Hover glow */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-gold-accent/[0.08] via-transparent to-transparent pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1.2 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Animated border */}
            <motion.div 
              className="absolute inset-0 border-2 border-gold-accent/0 group-hover:border-gold-accent/30 transition-colors duration-300 pointer-events-none"
            />

            <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
              {/* Tag */}
              <motion.div 
                className="font-mono text-gold-accent/40 text-[10px] uppercase tracking-widest mb-4"
                whileHover={{ color: "rgba(255, 193, 7, 0.9)", letterSpacing: "0.15em" }}
                transition={{ duration: 0.2 }}
              >
                {cap.tag}
              </motion.div>

              {/* Title */}
              <motion.h3 
                className="font-headline text-bone-white text-2xl md:text-3xl font-black uppercase tracking-tight mb-4"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                {cap.title}
              </motion.h3>

              {/* Description */}
              <p className="font-label text-bone-white/60 text-sm leading-relaxed mb-6">
                {cap.desc}
              </p>

              {/* Example Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {cap.examples.map((ex: string) => (
                  <motion.span
                    key={ex}
                    className="font-label text-[10px] uppercase tracking-widest text-gold-accent/70 border border-gold-accent/20 px-3 py-1 bg-gold-accent/[0.04] cursor-default"
                    whileHover={{ 
                      backgroundColor: "rgba(255, 193, 7, 0.15)",
                      borderColor: "rgba(255, 193, 7, 0.5)",
                      scale: 1.1,
                      y: -2
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {ex}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="relative z-10 border-t border-gold-accent/10 pt-6 mt-auto flex items-center justify-between flex-wrap gap-4" style={{ transform: "translateZ(20px)" }}>
              <motion.a
                href="#request"
                onClick={smoothScroll}
                className="font-headline text-xs font-black uppercase tracking-widest text-gold-accent hover:text-white transition-colors inline-flex items-center gap-2 group/link"
                whileHover={{ x: 6, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {capabilities.requestLabel}
                <motion.span 
                  className="material-symbols-outlined text-xs"
                  whileHover={{ x: 3, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  east
                </motion.span>
              </motion.a>
              {cap.curseForgeLabel && (
                <motion.a
                  href="https://www.curseforge.com/members/thelavforge/projects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-headline text-xs font-black uppercase tracking-widest text-[#FF8000] hover:text-white transition-colors inline-flex items-center gap-2"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {cap.curseForgeLabel}
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

