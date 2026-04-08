"use client";

interface FeatureGridProps {
  dict: any;
}

export default function FeatureGrid({ dict }: FeatureGridProps) {
  const services = [
    { id: "01", title: dict.services.addons.title, description: dict.services.addons.description, icon: "terminal" },
    { id: "02", title: dict.services.weakauras.title, description: dict.services.weakauras.description, icon: "analytics" },
    { id: "03", title: dict.services.ui.title, description: dict.services.ui.description, icon: "architecture" },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 border-b border-grid-border" id="services">
      {services.map((service) => (
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

