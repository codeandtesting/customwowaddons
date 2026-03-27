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
            <p className="mb-4">
              The Lav Forge ("the Studio") operates on a principle of data minimalism. We collect only the precise information required to negotiate, engineer, and deliver bespoke software solutions. This information is categorized as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-bone-white/70">
              <li><strong>Contact Information:</strong> Discord user IDs, Discord tags, and optionally email addresses provided during the ticketing process.</li>
              <li><strong>Technical Specifications:</strong> Details regarding your World of Warcraft gameplay, including character classes, UI resolution, active addons, guild raid strategies, and screen captures given to us for engineering context.</li>
              <li><strong>Financial Information:</strong> We do not store raw credit card numbers or crypto wallet seeds. All payment processing is securely offloaded to specialized third-party processors (e.g., Stripe, PayPal, or verified crypto gateways), which merely furnish us with cryptographic transaction receipts.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">2. How We Use Your Data</h2>
            <p className="mb-4">
              The data we collect is utilized strictly for operational fidelity. Your contact information is used exclusively to provide project updates, deliver compiled code, and coordinate post-deployment support. Your technical specifications are used solely to architect your custom software.
            </p>
            <p>
              <strong>We absolutely forbid the use of client data for unsolicited marketing.</strong> You will never receive automated newsletters, promotional spam, or upsell attempts based on the information provided during a build contract.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">3. Data Sharing & Strict Confidentiality</h2>
            <p className="mb-4">
              The Studio treats all client gameplay strategies and custom Lua logic as highly classified trade secrets. We will <strong>never</strong> sell, rent, or lease your data to any third-party analytics firms, marketing agencies, or rival gaming organizations.
            </p>
            <p>
              Furthermore, the specific mechanics of your commissioned addons (e.g., a proprietary auction sniping algorithm or a private mythic raiding WeakAura suite) will not be published, open-sourced, or uploaded to public addon repositories (like CurseForge, Wago.io, or GitHub) without your explicit, written authorization. 
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">4. Zero Telemetry & Spyware Policy</h2>
            <p className="mb-4">
              It is an unfortunate reality that many modern software applications covertly harvest user data. <strong>The Lav Forge operates differently.</strong>
            </p>
            <p>
              We guarantee that the custom Lua addons and WeakAura scripts we author contain absolutely <strong>zero telemetry, tracking pixels, or "phone-home" analytics payloads</strong>. Any data processed by your custom software executes entirely locally within your World of Warcraft client and your RAM. We do not track your in-game location, gold wealth, chat logs, or playing habits. What happens in your game client, stays in your game client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">5. Data Retention & Archival</h2>
            <p className="mb-4">
              To honor our 1-Month Post-Delivery Warranty and facilitate future maintenance contracts, the Studio archives the source code, scope documents, and ticket transcripts associated with your project on secured, encrypted offline drives.
            </p>
            <p>
              If you wish for your project data and ticket history to be permanently eradicated from our archives upon final delivery, you may submit a formal deletion request via your Discord ticket prior to its closure. Please note that requesting source code destruction will void any ability for the Studio to offer minor, cost-effective updates or bug fixes in the future.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">6. Third-Party Ecosystems</h2>
            <p>
              Our primary operations are conducted via Discord, and our primary product interfaces via the World of Warcraft client (owned by Blizzard Entertainment). The Studio is not responsible for the independent privacy policies, data harvesting practices, or security breaches of Discord Inc., Blizzard Entertainment, or any third-party payment gateways utilized during the transaction. We urge clients to utilize strong passwords and Multi-Factor Authentication (MFA) on all third-party platforms connected to our services.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
