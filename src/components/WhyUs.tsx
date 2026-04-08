"use client";

interface WhyUsProps {
  dict: any;
}

export default function WhyUs({ dict }: WhyUsProps) {
  const { whyUs } = dict;
  return (
    <section className="border-b border-grid-border" id="why-us">
      <div className="p-12 border-b border-grid-border text-center">
        <h2 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter text-bone-white">
          {whyUs.title}
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-grid-border">
        {whyUs.reasons.map((reason: any) => (
          <div key={reason.id} className="p-12">
            <div className="text-gold-accent font-label text-4xl mb-6 font-mono">{reason.id}</div>
            <h4 className="font-headline text-2xl mb-4 text-bone-white uppercase">
              {reason.title}
            </h4>
            <p className="text-bone-white/60 font-body leading-relaxed">
              {reason.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

