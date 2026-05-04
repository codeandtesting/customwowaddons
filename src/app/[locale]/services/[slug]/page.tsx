import { notFound } from "next/navigation";
import { generatePageSEO, generateFAQSchema } from "@/lib/seo";
import { pseoServicesDatabase, getPseoServiceBySlug } from "@/data/pseo";
import { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequestForm from "@/components/RequestForm";
import Script from "next/script";

interface PseoPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

// 1. Static Generation: Pre-build all pages at compile time!
export async function generateStaticParams() {
  return pseoServicesDatabase.map((page) => ({
    slug: page.slug,
  }));
}

// 2. Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: PseoPageProps) {
  const { locale, slug } = await params;
  const pageData = getPseoServiceBySlug(slug);

  if (!pageData) {
    return {};
  }

  return generatePageSEO({
    title: `${pageData.h1} | The Lav Forge`,
    description: pageData.shortDescription,
    canonical: `https://www.customwowaddon.com/${locale}/services/${slug}`,
  });
}

import { translations } from "@/data/translations";

function translateString(str: string, locale: string) {
  if (locale === 'en') return str;
  
  let translated = str;
  const map = translations[locale as keyof typeof translations];
  
  if (!map) return str;

  // Replace each key in the map. Sort by length descending to avoid partial replacements (e.g. "for" before "Custom Addon for")
  const sortedKeys = Object.keys(map).sort((a, b) => b.length - a.length);
  
  for (const en of sortedKeys) {
    const target = map[en];
    translated = translated.split(en).join(target);
  }
  
  return translated;
}


// 3. Page Render
export default async function PseoServicePage({ params }: PseoPageProps) {
  const { locale, slug } = await params;
  const pageData = getPseoServiceBySlug(slug);
  const dict = await getDictionary(locale);

  if (!pageData) {
    notFound();
  }

  return (
    <main key={locale} className="relative z-[2] min-h-screen text-bone-white selection:bg-gold-accent selection:text-obsidian flex flex-col">
      {/* Dynamic FAQ Schema for Google Rich Snippets */}
      <Script
        id="faq-schema-dynamic"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(pageData.faqs)),
        }}
      />
      
      <Navbar dict={dict} currentLocale={locale} />
      
      <div className="pt-32 pb-16 flex-1 flex flex-col relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forge-orange/10 border border-forge-orange/20 text-forge-orange font-label text-sm mb-6 shadow-[0_0_15px_rgba(255,107,0,0.2)] uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">code</span>
              {pageData.expansion} {translateString("Specialized", locale)}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-headline font-bold mb-6 tracking-tight drop-shadow-lg leading-tight">
              {translateString(pageData.h1.split(pageData.serviceType)[0], locale)}
              <span className="text-forge-orange">{translateString(pageData.serviceType, locale)}</span>
              {translateString(pageData.h1.split(pageData.serviceType)[1], locale)}
            </h1>
            
            <p className="text-xl text-bone-white/80 font-body leading-relaxed max-w-2xl mx-auto">
              {translateString(pageData.shortDescription, locale)}
            </p>
          </div>

          {/* Details & Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">
            <div className="bg-vulcan/40 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-headline text-gold-accent mb-4">{translateString("Why Choose Us for", locale)} {pageData.expansion}?</h2>
              <p className="text-bone-white/80 font-body leading-relaxed">
                {translateString(pageData.longDescription, locale)}
              </p>
            </div>
            
            <div className="bg-vulcan/40 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-headline text-gold-accent mb-6">{translateString("Included Features", locale)}</h2>
              <ul className="space-y-4">
                {pageData.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-bone-white/80 font-body">
                    <span className="material-symbols-outlined text-forge-orange mt-0.5">check_circle</span>
                    {translateString(feature, locale)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Custom FAQ Section */}
          <div className="max-w-4xl mx-auto mb-24">
            <h2 className="text-3xl font-headline font-bold text-center mb-12 text-bone-white">{translateString("Frequently Asked Questions", locale)}</h2>
            <div className="space-y-6">
              {pageData.faqs.map((faq, i) => (
                <div key={i} className="bg-vulcan/60 p-6 rounded-xl border border-white/5">
                  <h3 className="text-xl font-headline text-gold-accent mb-3">{translateString(faq.question, locale)}</h3>
                  <p className="text-bone-white/80 font-body">{translateString(faq.answer, locale)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Contact Form CTA */}
        <div className="mt-8">
          <RequestForm dict={dict} />
        </div>
      </div>
      
      <Footer dict={dict} currentLocale={locale} />
    </main>
  );
}
