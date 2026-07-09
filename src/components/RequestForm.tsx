"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface RequestFormProps {
  dict: any;
}

export default function RequestForm({ dict }: RequestFormProps) {
  const { request } = dict;
  
  const steps = [
    { step: "01", label: request.steps["01"].label, desc: request.steps["01"].desc },
    { step: "02", label: request.steps["02"].label, desc: request.steps["02"].desc },
    { step: "03", label: request.steps["03"].label, desc: request.steps["03"].desc },
  ];

  return (
    <section className="p-6 md:p-24 flex justify-center border-b border-grid-border" id="request">
      <div className="w-full max-w-4xl bg-obsidian/40 backdrop-blur-sm border-2 border-gold-accent p-12 md:p-16 relative text-center">
        {/* Terminal Tag removed as requested */}

        {/* Headline */}
        <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-bone-white font-black uppercase tracking-tighter leading-tight">
          {request.headline}
          <br />
          <span className="text-gold-accent">{request.accent}</span>
        </h2>

        {/* Divider */}
        <div className="w-24 h-[2px] bg-gold-accent mx-auto my-8 opacity-60" />

        {/* Description */}
        <p className="font-label text-bone-white/70 text-sm md:text-base uppercase tracking-widest leading-relaxed max-w-2xl mx-auto">
          {request.description}
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12">
          {steps.map((item) => (
            <div key={item.step} className="border border-gold-accent/20 bg-obsidian/50 p-6 group hover:border-gold-accent/60 transition-colors">
              <div className="font-mono text-gold-accent/40 text-xs mb-2">
                STEP_{item.step}
              </div>
              <div className="font-headline text-bone-white text-xl font-black uppercase tracking-tight">
                {item.label}
              </div>
              <div className="font-label text-bone-white/50 text-xs uppercase tracking-widest mt-2">
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {/* Discord Button */}
          <a
            href="https://discord.com/users/666937072484876298"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full py-4 border-2 border-[#5865F2] bg-[#5865F2]/10 text-[#5865F2] font-headline text-sm md:text-base font-black uppercase tracking-widest hover:bg-[#5865F2] hover:text-white hover:shadow-[0_0_20px_rgba(88,101,242,0.4)] transition-all duration-300 cursor-pointer group"
          >
            {/* Discord Icon */}
            <svg
              className="w-6 h-6 fill-current shrink-0 group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
            </svg>
            {request.cta.discord}
          </a>

          {/* Telegram Button */}
          <a
            href="https://t.me/F0A0A"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full py-4 border-2 border-[#0088cc] bg-[#0088cc]/10 text-[#0088cc] font-headline text-sm md:text-base font-black uppercase tracking-widest hover:bg-[#0088cc] hover:text-white hover:shadow-[0_0_20px_rgba(0,136,204,0.4)] transition-all duration-300 cursor-pointer group"
          >
            {/* Telegram Icon */}
            <svg
              className="w-6 h-6 fill-current shrink-0 group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.944 0C5.346 0 0 5.346 0 11.944c0 6.598 5.346 11.944 11.944 11.944 6.598 0 11.944-5.346 11.944-11.944C23.888 5.346 18.542 0 11.944 0zm5.206 16.561c-.173.247-.46.393-.761.393-.102 0-.206-.017-.306-.053l-9.083-3.238c-.378-.135-.612-.5-.589-.9s.306-.723.707-.816l2.316-.539 1.135-3.551c.094-.294.332-.516.634-.589.303-.073.619.01.841.222l1.666 1.583 3.013-1.076c.303-.108.636-.051.891.15.255.2.392.511.365.83l-.847 8.016c-.024.23-.11.446-.243.628z" />
            </svg>
            {request.cta.telegram}
          </a>

          {/* Fiverr Button */}
          <a
            href="https://pro.fiverr.com/s/bdERDgY"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full py-4 border-2 border-[#1dbf73] bg-[#1dbf73]/10 text-[#1dbf73] font-headline text-sm md:text-base font-black uppercase tracking-widest hover:bg-[#1dbf73] hover:text-obsidian hover:shadow-[0_0_20px_rgba(29,191,115,0.4)] transition-all duration-300 cursor-pointer group"
          >
            <div className="relative w-6 h-6 mr-3 shrink-0 group-hover:scale-110 transition-transform">
              <Image src="/fiverlogo2.png" alt="Fiverr Logo" fill sizes="24px" className="object-contain" />
            </div>
            {request.cta.fiverr}
          </a>
        </div>

        {/* Subtext */}
        <p className="font-label text-bone-white/30 text-[10px] uppercase tracking-[0.3em] mt-6">
          {request.subtext}
        </p>
        
        <LocalTimeStatus />
      </div>
    </section>
  );
}

function LocalTimeStatus() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000); // update every minute
    return () => clearInterval(timer);
  }, []);

  if (!time) return <div className="h-6 mt-4"></div>; // Placeholder to prevent layout shift

  // Calculate local time (GMT+3 / EEST)
  const utcMs = time.getTime() + (time.getTimezoneOffset() * 60000);
  const localDate = new Date(utcMs + (3 * 3600000));
  
  const hours = localDate.getHours();
  const minutes = localDate.getMinutes();
  
  // Online from 07:00 to 23:59
  const isOnline = hours >= 7;
  
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  
  const timeString = `${displayHours}:${displayMinutes} ${ampm} local time`;

  return (
    <div className="flex items-center justify-center gap-3 mt-4 font-label text-xs uppercase tracking-widest font-bold">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]'}`}></span>
        <span className={isOnline ? 'text-green-400' : 'text-red-400'}>{isOnline ? 'Online' : 'Offline'}</span>
      </div>
      <span className="text-bone-white/30">•</span>
      <span className="text-bone-white/70">{timeString}</span>
    </div>
  );
}
