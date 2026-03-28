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

const faqs = [
  {
    question: "How much does a custom WoW addon cost?",
    answer: "Pricing depends on the complexity of the project. Simple UI modifications or WeakAura suites start at a lower tier, while full-scale addon development with custom databases, localization, and multi-module architectures are quoted individually. Contact us via Discord or our request form for a free estimate.",
  },
  {
    question: "How long does it take to build a custom addon?",
    answer: "Most simple addons and WeakAura suites can be delivered within 1-3 days. Complex projects involving multiple modules, SavedVariables databases, or heavy API integration typically take 1-2 weeks. We provide progress updates throughout development.",
  },
  {
    question: "What programming language are WoW addons written in?",
    answer: "World of Warcraft addons are written in Lua (for logic) and XML (for UI structure). The game runs a sandboxed version of Lua 5.1. Modern developers often skip XML entirely and create frames directly in Lua using the WoW API.",
  },
  {
    question: "Are custom WoW addons safe and legal?",
    answer: "Yes. Custom addons are 100% legal and officially supported by Blizzard Entertainment. Addons run inside a sandbox and cannot access your operating system, read files, or automate gameplay inputs. They can only read data from the game engine and display it to the player.",
  },
  {
    question: "Can you build private addons that only I can use?",
    answer: "Absolutely. We specialize in private, custom-built addons engineered specifically for your playstyle, your guild's raid strategy, or your gold-making operation. Your addon will not be published publicly unless you choose to share it.",
  },
];

export default function Home() {
  return (
    <main className="relative z-[2] min-h-screen text-bone-white selection:bg-gold-accent selection:text-obsidian">
      {/* FAQ Schema for Google Rich Results */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqs)),
        }}
      />

      {/* Google Analytics 4 - Replace G-XXXXXXXXXX with your Measurement ID */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}
      </Script>

      <Navbar />
      <Hero />
      <FeatureGrid />
      <VersionsSection />
      <WhyUs />
      <Capabilities />
      <RequestForm />
      <Footer />
    </main>
  );
}
