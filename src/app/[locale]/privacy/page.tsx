import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generatePageSEO } from "@/lib/seo";
import { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageSEO({
    title: locale === "en" ? "Privacy Policy" : "Privacy Policy", // Simplified for now, will get from dict if needed
    description:
      "Privacy Policy for The Lav Forge. We collect only minimal data for custom WoW addon development.",
    canonical: `https://www.customwowaddon.com/${locale}/privacy`,
  });
}

export default async function PrivacyPolicy({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const { privacy } = dict;

  return (
    <main className="relative z-[2] min-h-screen text-bone-white selection:bg-gold-accent selection:text-obsidian flex flex-col pt-24">
      <Navbar dict={dict} currentLocale={locale} />
      
      <div className="flex-grow container mx-auto px-6 max-w-4xl py-12">
        <h1 className="font-headline text-5xl font-black mb-8 uppercase tracking-tighter text-gold-accent">
          {privacy.title}
        </h1>
        
        <div className="space-y-8 font-body text-lg leading-relaxed text-bone-white/80">
          {privacy.sections.map((section: any, index: number) => (
            <section key={index}>
              <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">{section.title}</h2>
              <p className="mb-4 text-bone-white/70 whitespace-pre-line">
                {section.content}
              </p>
            </section>
          ))}
        </div>
      </div>

      <Footer dict={dict} currentLocale={locale} />
    </main>
  );
}

