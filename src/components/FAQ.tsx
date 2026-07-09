"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface FAQProps {
  dict: any;
}

export default function FAQ({ dict }: FAQProps) {
  const faqItems = dict.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section 
      className="border-b border-grid-border relative z-10" 
      id="faq"
    >
      <div className="p-12 border-b border-grid-border text-center">
        <h2 className="font-headline text-4xl md:text-6xl font-black uppercase tracking-tighter text-bone-white">
          FREQUENTLY ASKED QUESTIONS
        </h2>
      </div>
      <div className="max-w-4xl mx-auto py-12 px-6">
        {faqItems.map((item: any, i: number) => (
          <div key={i} className="border-b border-grid-border/50 last:border-0 py-6">
            <button 
              onClick={() => toggleFAQ(i)}
              className="w-full text-left flex justify-between items-center group"
            >
              <h3 className="font-headline text-xl md:text-2xl font-bold text-bone-white group-hover:text-gold-accent transition-colors pr-8">
                {item.question}
              </h3>
              <span className="text-gold-accent font-mono text-2xl">
                {openIndex === i ? "-" : "+"}
              </span>
            </button>
            <motion.div 
              initial={false}
              animate={{ height: openIndex === i ? "auto" : 0, opacity: openIndex === i ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p 
                className="pt-4 text-bone-white/70 font-body leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
