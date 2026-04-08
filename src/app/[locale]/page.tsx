import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import VersionsSection from "@/components/VersionsSection";
import WhyUs from "@/components/WhyUs";
import Capabilities from "@/components/Capabilities";
import RequestForm from "@/components/RequestForm";
import Footer from "@/components/Footer";
import Script from "next/script";
import { generateFAQSchema } from "@/lib/seo";
import { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main className="relative z-[2] min-h-screen text-bone-white selection:bg-gold-accent selection:text-obsidian">
      {/* FAQ Schema for Google Rich Results */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(dict.faq)),
        }}
      />

      {/* Google Analytics 4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-5KTW7E883R"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-5KTW7E883R');
        `}
      </Script>

      <Navbar dict={dict} currentLocale={locale} />
      <Hero dict={dict} />
      <FeatureGrid dict={dict} />
      <VersionsSection dict={dict} />
      <WhyUs dict={dict} />
      <Capabilities dict={dict} />
      <RequestForm dict={dict} />
      <Footer dict={dict} currentLocale={locale} />
    </main>
  );
}


