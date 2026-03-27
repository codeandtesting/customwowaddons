import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generatePageSEO } from "@/lib/seo";

export const metadata: Metadata = generatePageSEO({
  title: "Terms of Service",
  description:
    "Terms of Service for The Lav Forge custom WoW addon development studio. Read our policies on custom Lua development, payments, IP ownership, and maintenance contracts.",
  canonical: "https://www.customwowaddon.com/terms",
});
export default function TermsOfService() {
  return (
    <main className="relative z-[2] min-h-screen text-bone-white selection:bg-gold-accent selection:text-obsidian flex flex-col pt-24">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-6 max-w-4xl py-12">
        <h1 className="font-headline text-5xl font-black mb-8 uppercase tracking-tighter text-gold-accent">
          Terms of Service
        </h1>
        
        <div className="space-y-8 font-body text-lg leading-relaxed text-bone-white/80">
          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">1. Services Provided</h2>
            <p>
              The Lav Forge ("the Studio") operates as a bespoke software development agency. 
              <strong> We do not sell pre-made addons, scripts, or World of Warcraft UI packages.</strong> 
              Instead, we provide strictly custom software engineering and Lua coding services. 
              All code is written to order based on the unique specifications provided by the client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">2. Intellectual Property & Compliance</h2>
            <p>
              The client acknowledges that all software development is performed within the parameters of the World of Warcraft public API. 
              We do not modify the game client, bypass server security, or provide any services that violate Blizzard Entertainment's Terms of Service regarding botting or automation. 
              The resulting code remains the intellectual property of the client upon final delivery and final payment, subject to applicable open-source licenses where third-party libraries (e.g., Ace3) are utilized.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">3. Payments and Delivery</h2>
            <p>
              Development begins only after the scope of work is agreed upon and an initial deposit is secured. 
              Due to the nature of custom software development, payments are non-refundable once engineering hours have been expended. 
              If the client alters the scope of the project midway, an amended quote will be provided.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">4. Maintenance and Patch Updates</h2>
            <p>
              Custom software requires maintenance as World of Warcraft updates (e.g., X.0 or X.X patches). 
              Unless a specific maintenance contract is established at the time of order, the Studio is not obligated to provide free lifetime updates for custom addons if breaking changes are introduced by the game developer in future patches.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">5. Disclaimer of Liability</h2>
            <p>
              The Studio provides custom software "AS IS". We are not liable for any account actions, losses, or software incompatibilities that occur as a result of using the custom code. 
              It is the client's responsibility to ensure the final product meets their operational expectations during the final review phase.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
