"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

interface WhyUsProps {
  dict: any;
}

// Counting animation component
function CountingNumber({ id, isHovered }: { id: string; isHovered: boolean }) {
  const number = parseInt(id.replace('_', ''));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isHovered) {
      let start = 0;
      const duration = 800;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.floor(easeOut * number));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      setDisplayValue(0);
    }
  }, [isHovered, number]);

  return (
    <motion.span>
      {displayValue.toString().padStart(2, '0')}_
    </motion.span>
  );
}

export default function WhyUs({ dict }: WhyUsProps) {
  const { whyUs } = dict;
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -40]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      rotateX: 10
    },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        delay: 0.2 + i * 0.1
      }
    })
  };

  const idVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -90
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: 0.3
      }
    }
  };

  return (
    <motion.section 
      className="border-b border-grid-border" 
      id="why-us"
      style={{ y }}
    >
      <motion.div 
        className="p-12 border-b border-grid-border text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
      >
        <motion.h2 
          className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter text-bone-white"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {whyUs.title}
        </motion.h2>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-grid-border" style={{ perspective: 1000 }}>
        {whyUs.reasons.map((reason: any, i: number) => (
          <motion.div
            key={reason.id}
            custom={i}
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            onHoverStart={() => setHoveredId(reason.id)}
            onHoverEnd={() => setHoveredId(null)}
            whileHover={{ 
              backgroundColor: "rgba(255, 193, 7, 0.03)",
              scale: 1.02,
              y: -6,
              boxShadow: "0 10px 30px rgba(212, 175, 55, 0.08)"
            }}
            transition={{ duration: 0.3 }}
            className="p-12 text-center lg:text-left cursor-default relative overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Hover glow */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-gold-accent/[0.03] to-transparent pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div 
              className="text-gold-accent font-label text-4xl mb-6 font-mono relative z-10"
              variants={idVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                textShadow: "0 0 25px rgba(212, 175, 55, 0.6)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{ transform: "translateZ(30px)" }}
            >
              <CountingNumber id={reason.id} isHovered={hoveredId === reason.id} />
            </motion.div>
            
            <motion.h4 
              className="font-headline text-2xl mb-4 text-bone-white uppercase relative z-10"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              style={{ transform: "translateZ(20px)" }}
            >
              {reason.title}
            </motion.h4>
            
            <motion.p 
              className="text-bone-white/60 font-body leading-relaxed relative z-10"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              style={{ transform: "translateZ(15px)" }}
            >
              {reason.description}
            </motion.p>
            
            {/* Decorative line */}
            <motion.div 
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-accent"
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

