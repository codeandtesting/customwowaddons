import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generatePageSEO } from "@/lib/seo";
import { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageSEO({
    title: locale === "en" ? "Terms of Service" : "Terms of Service",
    description:
      "Terms of Service for The Lav Forge. Read our policies on custom Lua development and IP ownership.",
    canonical: `https://www.customwowaddon.com/${locale}/terms`,
  });
}

export default async function TermsOfService({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const { terms } = dict;

  return (
    <main className="relative z-[2] min-h-screen text-bone-white selection:bg-gold-accent selection:text-obsidian flex flex-col pt-24">
      <Navbar dict={dict} currentLocale={locale} />
      
      <div className="flex-grow container mx-auto px-6 max-w-4xl py-12">
        <h1 className="font-headline text-5xl font-black mb-8 uppercase tracking-tighter text-gold-accent">
          {terms.title}
        </h1>
        
        <div className="space-y-8 font-body text-lg leading-relaxed text-bone-white/80">
          {terms.sections.map((section: any, index: number) => (
            <section key={index}>
              <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">{section.title}</h2>
              <p className="mb-4 text-bone-white/70">
                {section.content}
              </p>
            </section>
          ))}

          <section className="p-6 border border-gold-accent/20 bg-gold-accent/5 mt-12">
            <p className="text-sm font-label text-gold-accent/60 uppercase tracking-widest italic text-center">
              [ Full Legal Text available in English by default. Translated summaries provided for transparency. ]
            </p>
          </section>
        </div>
      </div>

      <Footer dict={dict} currentLocale={locale} />
    </main>
  );
}

