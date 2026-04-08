"use client";
import Image from "next/image";

interface VersionsSectionProps {
  dict: any;
}

export default function VersionsSection({ dict }: VersionsSectionProps) {
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
    <section className="grid grid-cols-1 lg:grid-cols-3 border-b border-grid-border min-h-[600px]" id="versions">
      {versions.map((ver) => (
        <div key={ver.title} className={`relative group cursor-pointer overflow-hidden border-b lg:border-b-0 lg:border-r border-grid-border flex flex-col justify-end p-12 last:border-0 transition-all duration-500 ${ver.border}`}>
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

          {/* Locked Content Block - Fixed height ensures perfect horizontal baseline alignment */}
          <div className="relative z-10 w-full h-[320px] flex flex-col justify-start">
            <h3 className={`text-4xl font-headline font-black mb-6 uppercase text-bone-white transition-all duration-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] whitespace-pre-line leading-[1.0] tracking-tighter ${ver.accent}`}>
              {ver.title}
            </h3>
            
            <p className="max-w-md text-lg font-body leading-relaxed text-bone-white/80 uppercase mb-4">
              {ver.description}
            </p>
            
            {/* mt-auto pushes the protocol to the bottom of the 320px block, keeping it in line across cards */}
            <div className={`mt-auto font-label text-sm font-mono transition-all duration-500 ${ver.accent}`}>
              [ {ver.protocol} ]
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
