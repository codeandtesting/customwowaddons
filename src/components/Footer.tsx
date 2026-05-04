"use client";

interface FooterProps {
  dict: any;
  currentLocale: string;
}

export default function Footer({ dict, currentLocale }: FooterProps) {
  const { footer, brand } = dict;
  return (
    <footer className="w-full border-t border-[#333333]/50 py-8 px-6 flex flex-col md:flex-row justify-between items-center bg-[#09090B]/80 backdrop-blur-md">
      <div className="text-lg font-bold text-[#F3EFE0] font-headline uppercase mb-4 md:mb-0">
        {brand}
      </div>
      
      <div className="flex gap-8 mb-4 md:mb-0 text-[10px] font-label uppercase tracking-widest text-[#F3EFE0]">
        <a className="hover:text-gold-accent transition-none" href={`/${currentLocale}/terms`}>
          {footer.links.terms}
        </a>
        <a className="hover:text-gold-accent transition-none" href={`/${currentLocale}/privacy`}>
          {footer.links.privacy}
        </a>
        <a className="hover:text-gold-accent transition-none" href={`/${currentLocale}/how-to-create-wow-addons`}>
          {footer.links.howTo}
        </a>
        <a className="hover:text-gold-accent transition-none" href={`/${currentLocale}/gif-to-tga-converter`}>
          TGA CONVERTER
        </a>
      </div>

      <div className="font-label text-[10px] uppercase tracking-widest text-[#F3EFE0]/40">
        {footer.copyright}
      </div>
    </footer>
  );
}

