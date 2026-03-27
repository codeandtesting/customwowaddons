import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generatePageSEO } from "@/lib/seo";

export const metadata: Metadata = generatePageSEO({
  title: "Privacy Policy",
  description:
    "Privacy Policy for The Lav Forge. We collect only minimal data for custom WoW addon development. No tracking in addons, no data sharing, no marketing without consent.",
  canonical: "https://www.customwowaddon.com/privacy",
});

export default function PrivacyPolicy() {
  return (
    <main className="relative z-[2] min-h-screen text-bone-white selection:bg-gold-accent selection:text-obsidian flex flex-col pt-24">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-6 max-w-4xl py-12">
        <h1 className="font-headline text-5xl font-black mb-8 uppercase tracking-tighter text-gold-accent">
          Privacy Policy
        </h1>
        
        <div className="space-y-8 font-body text-lg leading-relaxed text-bone-white/80">
          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">1. Information We Collect</h2>
            <p>
              The Lav Forge ("the Studio") collects only the necessary information required to fulfill custom software development contracts. 
              This includes contact information (e.g., Discord handles, email addresses), payment processing details (handled via secure third-party gateways), 
              and technical specifications provided by the client (such as class preferences, guild requirements, or UI screenshots) necessary for custom addon creation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">2. How We Use Information</h2>
            <p>
              We use the information we collect solely for the purpose of communicating with clients, delivering custom Lua code, 
              providing technical support, and managing billing. We do not use your information for marketing purposes without explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">3. Data Sharing</h2>
            <p>
              We do not sell, rent, or lease client data to any third parties. 
              Information regarding your custom addons, including your private guild mechanics or specific weakauras, 
              will never be shared publicly or uploaded to repositories like CurseForge without your written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">4. Game Telemetry and Addon Data</h2>
            <p>
              The custom addons and weakauras we develop do not "phone home." 
              Any data collected by an addon runs locally on your machine and within the World of Warcraft client. 
              We do not hardcode tracking pixels, analytics scripts, or hidden data collection methods into your commissioned software.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">5. Third-Party Services</h2>
            <p>
              Our website may contain links to third-party services (like Discord or payment processors). 
              Please be aware that we are not responsible for the privacy practices of such other sites or applications. 
              We encourage our users to read the privacy statements of every service that collects personally identifiable information.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
