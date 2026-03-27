import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import VersionsSection from "@/components/VersionsSection";
import WhyUs from "@/components/WhyUs";
import Capabilities from "@/components/Capabilities";
import RequestForm from "@/components/RequestForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative z-[2] min-h-screen text-bone-white selection:bg-gold-accent selection:text-obsidian">
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
