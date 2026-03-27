"use client";
import { siteContent } from "@/data/mockData";

export default function FeatureGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 border-b border-grid-border" id="services">
      {siteContent.services.map((service) => (
        <div key={service.id} className="p-12 border-b md:border-b-0 md:border-r border-grid-border hover:bg-surface-container transition-colors group cursor-default">
          <div className="flex items-center gap-4 mb-8">
            <span className="material-symbols-outlined text-gold-accent text-4xl">
              {service.icon}
            </span>
            <span className="text-[10px] font-label text-gold-accent uppercase tracking-widest">{service.id}</span>
          </div>
          <h2 className="font-headline text-4xl mb-6 text-bone-white uppercase">
            {service.title}
          </h2>
          <p className="text-bone-white/70 leading-relaxed font-body">
            {service.description}
          </p>
          <div className="mt-12 h-1 w-0 bg-gold-accent group-hover:w-full transition-all duration-300"></div>
        </div>
      ))}
    </section>
  );
}
