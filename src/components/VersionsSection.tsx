"use client";
import { siteContent } from "@/data/mockData";

export default function VersionsSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 border-b border-grid-border min-h-[600px]" id="versions">
      {siteContent.versions.map((ver) => (
        <div key={ver.title} className="relative group cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-grid-border flex flex-col justify-end p-12">
          <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-20 transition-opacity">
            <img className="w-full h-full object-cover grayscale brightness-50 contrast-125" src={ver.image} alt={ver.title} />
          </div>
          <div className="relative z-10">
            <h3 className="font-headline text-6xl font-black mb-6 uppercase tracking-tighter">
              {ver.title}
            </h3>
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
