"use client";
import Image from "next/image";

interface VersionsSectionProps {
  dict: any;
}

export default function VersionsSection({ dict }: VersionsSectionProps) {
  const versions = [
    { 
      ...dict.versions.midnight, 
      image: "/midnight.png" 
    },
    { 
      ...dict.versions.tbc, 
      image: "/tbc.png" 
    },
    { 
      ...dict.versions.private, 
      image: "/private_server_bg.png" 
    },
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 border-b border-grid-border min-h-[600px]" id="versions">
      {versions.map((ver) => (
        <div key={ver.title} className="relative group cursor-pointer overflow-hidden border-b lg:border-b-0 lg:border-r border-grid-border flex flex-col justify-end p-12 last:border-0">
          <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-20 transition-opacity">
            <Image className="w-full h-full object-cover grayscale brightness-50 contrast-125" src={ver.image} alt={`${ver.title} - Custom WoW Addon Development`} fill sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
          <div className="relative z-10">
            <p className="max-w-md text-lg font-body leading-relaxed text-bone-white/70 uppercase">
              {ver.description}
            </p>
            <div className="mt-8 font-label text-sm font-mono group-hover:font-bold">
              [ {ver.protocol} ]
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

