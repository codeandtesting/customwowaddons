"use client";
import FireParticles from "./FireParticles";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";

interface HeroProps {
  dict: any;
}

export default function Hero({ dict }: HeroProps) {
  const { hero } = dict;
  const { scrollY } = useScroll();
  const y = useSpring(useTransform(scrollY, [0, 500], [0, 150]), { stiffness: 100, damping: 30 });
  const opacity = useSpring(useTransform(scrollY, [0, 300], [1, 0]), { stiffness: 100, damping: 30 });
  const scale = useSpring(useTransform(scrollY, [0, 500], [1, 1.1]), { stiffness: 100, damping: 30 });
  const rotateX = useSpring(useTransform(scrollY, [0, 500], [0, 5]), { stiffness: 100, damping: 30 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      rotateX: 20,
      filter: "blur(15px)",
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  const descriptionVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      filter: "blur(8px)",
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.7,
        delay: 0.2
      }
    }
  };

  const bottomBarVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.4
      }
    }
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: [0.2, 0.4, 0.2],
      scale: [1, 1.3, 1],
      transition: {
        duration: 4,
        repeat: Infinity
      }
    }
  };

  const orbVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      x: 0,
      y: 0
    },
    visible: {
      opacity: [0.15, 0.25, 0.15],
      scale: [1, 1.2, 1],
      x: [0, 30, 0],
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity
      }
    }
  };

  return (
    <section 
      className="relative min-h-[921px] flex flex-col pt-16 border-b border-grid-border overflow-hidden"
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
    >
      {/* Floating Orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-accent/10 blur-3xl pointer-events-none z-0"
        variants={orbVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none z-0"
        variants={orbVariants}
        initial="hidden"
        animate="visible"
        style={{ transitionDelay: "1s" }}
      />
      <motion.div 
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none z-0"
        variants={orbVariants}
        initial="hidden"
        animate="visible"
        style={{ transitionDelay: "2s" }}
      />

      <motion.div 
        className="absolute inset-0 opacity-20 pointer-events-none z-0 hidden"
        style={{ y, opacity, scale, rotateX }}
      >
        <Image 
          className="w-full h-full object-cover brightness-50 contrast-100" 
          src="/hero_main.png" 
          alt={`${dict.brand} - Custom WoW Addon Development Studio`}
          fill
          priority
          sizes="100vw"
        />
      </motion.div>

      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        variants={glowVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gold-accent/5 via-transparent to-transparent" />
      </motion.div>

      <FireParticles />

      <motion.div 
        className="flex-grow flex flex-col justify-center px-6 md:px-12 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ perspective: 1000 }}
      >
        <motion.h1 
          className="font-headline text-4xl sm:text-5xl md:text-8xl lg:text-[7rem] leading-[1.1] md:leading-none font-black tracking-tighter text-bone-white uppercase mb-4 mt-8 md:mt-0 break-words hyphens-auto"
          variants={textVariants}
          style={{ transformStyle: "preserve-3d" }}
        >
          {hero.title.part1} <motion.span className="text-gold-accent text-shadow-gold inline-block" whileHover={{ scale: 1.08, rotate: 3, textShadow: "0 0 30px rgba(212, 175, 55, 0.8)" }} transition={{ duration: 0.3 }}>{hero.title.accent1}</motion.span><br />
          {hero.title.part2} <motion.span className="text-gold-accent text-shadow-gold inline-block" whileHover={{ scale: 1.08, rotate: -3, textShadow: "0 0 30px rgba(212, 175, 55, 0.8)" }} transition={{ duration: 0.3 }}>{hero.title.accent2}</motion.span><br />
          {hero.title.part3} <motion.span className="text-gold-accent text-shadow-gold inline-block" whileHover={{ scale: 1.08, rotate: 3, textShadow: "0 0 30px rgba(212, 175, 55, 0.8)" }} transition={{ duration: 0.3 }}>{hero.title.accent3}</motion.span>
        </motion.h1>
        
        <motion.div 
          className="max-w-2xl mt-8"
          variants={descriptionVariants}
        >
          <motion.p 
            className="text-xl md:text-2xl text-bone-white/80 font-body leading-relaxed"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
          >
            {hero.description}
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div 
        className="border-t border-grid-border flex flex-col md:flex-row gap-6 justify-between items-center p-6 bg-obsidian/80 backdrop-blur-md relative z-10"
        variants={bottomBarVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="hidden md:block text-[10px] font-label uppercase tracking-[0.2em] text-bone-white/40"
          whileHover={{ opacity: 0.6, x: -4 }}
          transition={{ duration: 0.25 }}
        >
          {hero.badge}
        </motion.div>
        <div className="flex flex-col sm:flex-row gap-4 md:gap-8 text-[10px] font-label uppercase tracking-[0.2em] text-gold-accent justify-end w-full">
          <motion.a 
            className="hover:text-primary transition-colors whitespace-nowrap inline-block relative group min-w-[120px] text-center"
            href="https://discord.com/users/666937072484876298"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 8, y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            DISCORD DIRECT
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-px bg-gold-accent group-hover:w-full transition-all duration-300"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
            />
          </motion.a>
          <motion.a 
            className="hover:text-primary transition-colors whitespace-nowrap inline-block relative group min-w-[120px] text-center"
            href="https://t.me/F0A0A"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 8, y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            TELEGRAM
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-px bg-gold-accent group-hover:w-full transition-all duration-300"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
            />
          </motion.a>
          <motion.a 
            className="hover:text-primary transition-colors whitespace-nowrap inline-block relative group min-w-[120px] text-center"
            href="https://pro.fiverr.com/s/bdERDgY"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 8, y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            FIVERR PRO
            <motion.span 
              className="absolute -bottom-1 left-0 w-0 h-px bg-gold-accent group-hover:w-full transition-all duration-300"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
            />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

