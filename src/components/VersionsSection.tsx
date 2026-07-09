"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface VersionsSectionProps {
  dict: any;
}

export default function VersionsSection({ dict }: VersionsSectionProps) {
  const { scrollYProgress } = useScroll();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay: 0.3
      }
    }
  };

  const protocolVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.5
      }
    }
  };

  const versions = [
    { 
      ...dict.versions.midnight, 
      image: "/midnight.png",
      accent: "group-hover:text-void",
      border: "group-hover:border-void/30"
    },
    { 
      ...dict.versions.tbc, 
      image: "/tbc.png",
      accent: "group-hover:text-fel",
      border: "group-hover:border-fel/30"
    },
    { 
      ...dict.versions.private, 
      image: "/private_servers.png",
      accent: "group-hover:text-ice",
      border: "group-hover:border-ice/30"
    },
  ];

  return (
    <motion.section 
      className="grid grid-cols-1 lg:grid-cols-3 border-b border-grid-border min-h-[600px]" 
      id="versions"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {versions.map((ver, i) => (
        <motion.div 
          key={ver.title} 
          custom={i}
          variants={cardVariants}
          className={`relative group cursor-pointer overflow-hidden border-b lg:border-b-0 lg:border-r border-grid-border flex flex-col justify-end p-12 last:border-0 transition-all duration-500 ${ver.border}`}
        >
          {/* Background Image - Colorful restoration */}
          <div className="absolute inset-0 z-0 opacity-60 group-hover:opacity-40 transition-opacity duration-700">
            <Image 
              className="w-full h-full object-cover brightness-[0.7] contrast-[1.1] scale-105 group-hover:scale-110 transition-transform duration-[2000ms]" 
              src={ver.image} 
              alt={`${ver.title.replace('\n', ' ')} - Custom WoW Addon Development`} 
              fill 
              sizes="(max-width: 768px) 100vw, 33vw" 
            />
          </div>

          {/* Vignette overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-[1]"></div>

          {/* Locked Content Block - Min height ensures perfect horizontal baseline alignment without cutting off content */}
          <motion.div 
            className="relative z-10 w-full min-h-[380px] flex flex-col justify-start"
            variants={textVariants}
          >
            <motion.h3 
              className={`text-4xl font-headline font-black mb-6 uppercase text-bone-white transition-all duration-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] whitespace-pre-line leading-[1.0] tracking-tighter ${ver.accent}`}
              whileHover={{ scale: 1.05, x: 5 }}
              transition={{ duration: 0.3 }}
            >
              {ver.title}
            </motion.h3>
            
            <motion.p 
              className="max-w-md text-lg font-body leading-relaxed text-bone-white/80 uppercase mb-4"
              whileHover={{ x: 3 }}
              transition={{ duration: 0.3 }}
            >
              {ver.description}
            </motion.p>
            
            {/* mt-auto pushes the button to the bottom of the 320px block, keeping it in line across cards */}
            <motion.a 
              href="#request"
              className={`mt-auto inline-flex items-center justify-between border border-white/10 bg-black/40 hover:bg-white/10 px-6 py-4 font-headline text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300 ${ver.accent} hover:border-white/30`}
              variants={protocolVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{ver.protocol}</span>
              <span className="material-symbols-outlined text-sm transform group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
            </motion.a>
          </motion.div>
        </motion.div>
      ))}
    </motion.section>
  );
}
