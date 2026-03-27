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
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">1. Scope of Services</h2>
            <p className="mb-4">
              The Lav Forge ("the Studio", "we", or "us") operates as a boutique software development agency specializing in custom Lua programming for the World of Warcraft client. We do not sell pre-packaged addons, distribute public user interfaces, or peddle off-the-shelf scripts.
            </p>
            <p>
              Every software solution is engineered to order based on the precise technical specifications, class mechanics, and gameplay requirements provided by the user ("the Client"). Acceptance of a project is at the sole discretion of the Studio.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">2. Technical Limitations & Revisions</h2>
            <p className="mb-4">
              All development is strictly constrained by the limitations of the official World of Warcraft public API and user interface engine. If an requested feature becomes impossible due to undocumented API restrictions discovered during development, the Client will be notified immediately to negotiate an alternative solution or a partial refund.
            </p>
            <p>
              Minor revisions (e.g., color changes, small anchor adjustments) requested within 7 days of initial delivery are included free of charge. Major architectural changes or mechanical revisions not included in the original project scope will require a new work order and additional billing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">3. Intellectual Property & Game Compliance</h2>
            <p className="mb-4">
              The Studio strictly adheres to the Blizzard Entertainment Terms of Service and End User License Agreement. We absolutely do not develop, distribute, or condone software that modifies game memory, bypasses anti-cheat systems, automates gameplay (botting), or provides unfair advantages outside the bounds of the sanctioned addon API.
            </p>
            <p>
              Upon final payment and delivery, the Client receives a non-exclusive license to use the custom software. The Studio retains the underlying architectural rights and may reuse structural code patterns in future projects, but will never share, sell, or publicize the Client's specific mechanic logic, guild strategies, or custom visual assets without explicit written permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">4. Order Process, Deposits, and Refunds</h2>
            <p className="mb-4">
              Development commences only after a comprehensive scope of work document is agreed upon via our official Discord ticketing system, and a non-refundable initial deposit (typically 50% of the total quote) is secured.
            </p>
            <p>
              Due to the bespoke nature of software engineering, payments and deposits are non-refundable once developer hours have been expended. If the Client cancels a project mid-development, the deposit is forfeit to cover labor costs. Final delivery of the compiled addon or WeakAura export string occurs only after the remaining balance is paid in full.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">5. Maintenance, Warranty, and Game Updates</h2>
            <p className="mb-4">
              World of Warcraft is a live-service game subject to undocumented API changes, major patch overhauls (X.0), and minor content updates (X.X.X). The Studio provides a <strong>1-Month Post-Delivery Warranty</strong> covering bug fixes, Lua errors, and minor adjustments strictly related to the original scope of work.
            </p>
            <p>
              Once the 1-month warranty expires, the Studio is not obligated to provide free updates if a future game patch breaks the addon. Clients may purchase extended maintenance contracts or order patch-update packages at our standard hourly developer rate to restore functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">6. Disclaimer of Warranties & Liability</h2>
            <p className="mb-4">
              The Studio provides all custom software on an "AS IS" and "AS AVAILABLE" basis, without warranties of any kind, either express or implied, including but not limited to warranties of merchantability or fitness for a particular purpose.
            </p>
            <p>
              In no event shall the Studio, its developers, or its affiliates be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the custom software. This includes, but is not limited to, in-game account suspensions, loss of virtual currency, diminished gameplay performance, or software incompatibilities with other third-party addons. Use of custom modifications is entirely at the Client's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-bone-white mb-4 uppercase tracking-[0.1em]">7. Refusal of Service</h2>
            <p>
              The Studio reserves the right to refuse service, terminate contracts, or instantly close Discord tickets at our discretion. We hold a zero-tolerance policy for toxic behavior, unrealistic demands, attempts to solicit malicious software (exploits/bots), or failure to communicate in a professional manner. In the event of contract termination due to Client misconduct, all pending payments become immediately due, and no refunds will be issued for completed labor.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
