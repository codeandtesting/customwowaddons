import { notFound } from "next/navigation";
import { generatePageSEO } from "@/lib/seo";
import { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RequestForm from "@/components/RequestForm";
import fs from 'fs';
import path from 'path';

interface AddonTypeData {
  slug: string;
  title: string;
  category: string;
  short_desc: string;
  features: string[];
  example_project: string;
  testimonial: {
    text: string;
    author: string;
  };
}

// Helper to load the JSON file
function getAddonTypesData(): AddonTypeData[] {
  const filePath = path.join(process.cwd(), 'src', 'data', 'addon-types.json');
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Error reading addon-types.json:", error);
    return [];
  }
}

interface AddonDevelopmentPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

// 1. Static Generation
export async function generateStaticParams() {
  const addons = getAddonTypesData();
  return addons.map((addon) => ({
    slug: addon.slug,
  }));
}

// 2. Dynamic Metadata
export async function generateMetadata({ params }: AddonDevelopmentPageProps) {
  const { locale, slug } = await params;
  const addons = getAddonTypesData();
  const pageData = addons.find(a => a.slug === slug);

  if (!pageData) return {};

  return generatePageSEO({
    title: `${pageData.title} | Expert WoW Developers`,
    description: pageData.short_desc,
    canonical: `https://www.customwowaddon.com/${locale}/addon-development/${slug}`,
  });
}

// 3. Page Rendering
export default async function AddonDevelopmentPage({ params }: AddonDevelopmentPageProps) {
  const { locale, slug } = await params;
  const addons = getAddonTypesData();
  const pageData = addons.find(a => a.slug === slug);
  const dict = await getDictionary(locale);

  if (!pageData) {
    notFound();
  }

  return (
    <main key={locale} className="relative z-[2] min-h-screen text-bone-white selection:bg-gold-accent selection:text-obsidian flex flex-col">
      <Navbar dict={dict} currentLocale={locale} />
      
      <div className="pt-32 pb-16 flex-1 flex flex-col relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-forge-orange/10 border border-forge-orange/20 text-forge-orange font-label text-sm mb-6 shadow-[0_0_15px_rgba(255,107,0,0.2)] uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">construction</span>
              {pageData.category} Specialist
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-headline font-bold mb-6 tracking-tight drop-shadow-lg leading-tight">
              <span className="text-forge-orange">{pageData.title.split(' ')[0]}</span> {pageData.title.substring(pageData.title.indexOf(' ') + 1)}
            </h1>
            
            <p className="text-xl text-bone-white/80 font-body leading-relaxed max-w-2xl mx-auto">
              {pageData.short_desc}
            </p>
          </div>

          {/* Details & Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-16">
            <div className="bg-vulcan/40 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-headline text-gold-accent mb-4">What we build for you</h2>
              <p className="text-bone-white/80 font-body leading-relaxed mb-6">
                Our expert Lua developers specialize in building {pageData.title.toLowerCase()}s completely from scratch using robust frameworks like Ace3 or pure custom XML/Lua depending on your performance needs.
              </p>
              
              <div className="p-4 bg-obsidian/60 border border-white/10 rounded-lg">
                <span className="text-forge-orange font-bold text-sm uppercase tracking-widest block mb-2">Example Project</span>
                <p className="text-bone-white font-body italic text-sm">
                  "{pageData.example_project}"
                </p>
              </div>
            </div>
            
            <div className="bg-vulcan/40 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
              <h2 className="text-2xl font-headline text-gold-accent mb-6">Specific Features</h2>
              <ul className="space-y-4">
                {pageData.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-bone-white/80 font-body">
                    <span className="material-symbols-outlined text-forge-orange mt-0.5">check_circle</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Testimonial Section */}
          <div className="max-w-4xl mx-auto mb-24 relative">
            <div className="absolute -left-4 -top-6 text-6xl text-forge-orange/20 font-serif">"</div>
            <div className="bg-gradient-to-r from-forge-orange/5 to-transparent border-l-4 border-forge-orange p-8 rounded-r-2xl">
              <p className="text-xl md:text-2xl font-headline text-bone-white mb-4 leading-relaxed">
                {pageData.testimonial.text}
              </p>
              <p className="text-forge-orange font-label uppercase tracking-widest text-sm">
                — {pageData.testimonial.author}
              </p>
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
