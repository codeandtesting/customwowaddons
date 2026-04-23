"use client";
import { motion, useScroll, useTransform } from "framer-motion";

interface FeatureGridProps {
  dict: any;
}

export default function FeatureGrid({ dict }: FeatureGridProps) {
  const services = [
    { id: "01", title: dict.services.addons.title, description: dict.services.addons.description, icon: "terminal" },
    { id: "02", title: dict.services.weakauras.title, description: dict.services.weakauras.description, icon: "analytics" },
    { id: "03", title: dict.services.ui.title, description: dict.services.ui.description, icon: "architecture" },
  ];

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -30]);

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95,
      filter: "blur(5px)"
    },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay: i * 0.12
      }
    })
  };

  const iconVariants = {
    hidden: { 
      rotate: -180,
      scale: 0,
      opacity: 0
    },
    visible: {
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <motion.section 
      className="grid grid-cols-1 md:grid-cols-3 border-b border-grid-border" 
      id="services"
      style={{ y }}
    >
      {services.map((service, i) => (
        <motion.div
          key={service.id}
          custom={i}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          whileHover={{ 
            backgroundColor: "rgba(255, 193, 7, 0.05)",
            scale: 1.02,
            y: -5
          }}
          transition={{ duration: 0.3 }}
          className="p-12 border-b md:border-b-0 md:border-r border-grid-border hover:bg-surface-container transition-colors group cursor-default relative overflow-hidden"
          style={{ perspective: 500 }}
        >
          {/* Hover glow effect */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-gold-accent/[0.05] to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div 
            className="flex items-center gap-4 mb-8 relative z-10"
            whileHover={{ x: 6 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              variants={iconVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <motion.span 
                className="material-symbols-outlined text-gold-accent text-4xl block"
                whileHover={{ 
                  rotate: 15, 
                  scale: 1.15,
                  textShadow: "0 0 20px rgba(212, 175, 55, 0.5)"
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                {service.icon}
              </motion.span>
              {/* Glow ring */}
              <motion.div 
                className="absolute inset-0 -m-2 rounded-full border-2 border-gold-accent/0 group-hover:border-gold-accent/30 transition-colors duration-300"
                whileHover={{ scale: 1.2, opacity: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
              />
            </motion.div>
            <motion.span 
              className="text-[10px] font-label text-gold-accent uppercase tracking-widest"
              whileHover={{ letterSpacing: "0.15em", color: "rgba(255, 193, 7, 1)" }}
              transition={{ duration: 0.2 }}
            >
              {service.id}
            </motion.span>
          </motion.div>
          
          <motion.h2 
            className="font-headline text-4xl mb-6 text-bone-white uppercase relative z-10"
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            {service.title}
          </motion.h2>
          
          <motion.p 
            className="text-bone-white/70 leading-relaxed font-body relative z-10"
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {service.description}
          </motion.p>
        </motion.div>
      ))}
    </motion.section>
  );
}

