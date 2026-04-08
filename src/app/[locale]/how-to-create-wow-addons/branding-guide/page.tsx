import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { generatePageSEO, generateArticleSchema, generateBreadcrumbSchema, SITE_URL } from "@/lib/seo";
import Link from "next/link";
import Script from "next/script";
import { Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return generatePageSEO({
    title: "Branding Your WoW Addon: Custom Logos, Icons & Textures",
    description: "Learn how to brand your World of Warcraft addon with custom minimap icons, addon list logos, and in-game textures using TGA files and Lua scripting.",
    canonical: `https://www.customwowaddon.com/${locale}/how-to-create-wow-addons/branding-guide`,
    datePublished: "2026-03-30T12:00:00Z",
  });
}

export default async function BrandingGuide({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <main className="relative z-[2] min-h-screen text-bone-white selection:bg-[#FF8000] selection:text-obsidian flex flex-col pt-24 bg-[#09090B]">
      <Navbar dict={dict} currentLocale={locale} />

      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateArticleSchema({
            title: "Branding Your WoW Addon: Custom Logos, Icons & Textures",
            description: "Learn how to brand your World of Warcraft addon with custom minimap icons, addon list logos, and in-game textures using TGA files and Lua scripting.",
            url: `${SITE_URL}/${locale}/how-to-create-wow-addons/branding-guide`,
            datePublished: "2026-03-30T12:00:00Z",
          })),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema([
            { name: "Home", url: `${SITE_URL}/${locale}` },
            { name: "How to Create a WoW Addon", url: `${SITE_URL}/${locale}/how-to-create-wow-addons` },
            { name: "Branding Guide", url: `${SITE_URL}/${locale}/how-to-create-wow-addons/branding-guide` },
          ])),
        }}
      />
      
      <div className="flex-grow container mx-auto px-6 max-w-3xl py-12">
        <Link href={`/${locale}/how-to-create-wow-addons`} className="font-label text-[#FF8000] text-xs uppercase tracking-widest hover:text-white transition-colors mb-8 inline-flex items-center">
          ← Back to Guides
        </Link>
        
        <header className="mb-8 border-b border-[#FF8000]/20 pb-8">
          <div className="font-mono text-[#FF8000]/60 mb-2">PART_05</div>
          <h1 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter text-bone-white leading-[1.1]">
            Branding Your WoW Addon: Custom Logos, Icons & Textures
          </h1>
        </header>

        <div className="font-mono text-xs text-[#FF8000]/80 mb-6 tracking-widest uppercase border-l-2 border-[#FF8000] pl-4">
          Published: March 30, 2026
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#Branding</span>
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#Textures</span>
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#LuaScripting</span>
          <span className="bg-[#FF8000]/10 text-[#FF8000] px-3 py-1 font-mono text-xs uppercase border border-[#FF8000]/20">#GameDev</span>
        </div>

        <article className="space-y-8 font-body text-lg text-bone-white/80 leading-relaxed">
          <p>
            You have built a functional addon for World of Warcraft. It works, it solves a real problem, and you are proud of it. But is it <em>really</em> finished if it does not have its own custom branding? A unique minimap button, a professional icon in the AddOns list, and custom in-game textures are what separate a &quot;script someone threw together&quot; from a polished, studio-quality addon. In this guide, we walk through the exact process we use at The Lav Forge to brand our addons.
          </p>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            1. File Format Requirements
          </h2>
          <p>
            The WoW engine is an old-school renderer with strict requirements for its graphics. If your image does not meet these criteria, it will either appear as a solid green box or not render at all.
          </p>

          <h3 className="text-xl font-bold text-bone-white mb-3 mt-8">
            Dimensions: Power of 2
          </h3>
          <p>
            Your image <strong>must</strong> have dimensions that are a power of 2. This is a hard requirement inherited from old-school GPU texture memory alignment.
          </p>
          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="bg-green-500/10 border border-green-500/30 p-4 text-sm">
              <strong className="text-green-400 block mb-2 font-mono uppercase tracking-widest">Valid Sizes</strong>
              <code>16x16, 32x32, 64x64, 128x128, 256x256</code>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 p-4 text-sm">
              <strong className="text-red-400 block mb-2 font-mono uppercase tracking-widest">Invalid Sizes</strong>
              <code>100x100, 50x50, 48x48, 200x200</code>
            </div>
          </div>

          <h3 className="text-xl font-bold text-bone-white mb-3 mt-8">
            File Format Options
          </h3>
          <ul className="list-disc pl-6 space-y-3 text-bone-white/70">
            <li>
              <strong className="text-[#FF8000]">.TGA (Truevision Graphics Adapter)</strong>: The most common and reliable choice. Save it as <strong>32-bit</strong> to include an alpha channel for transparency, and make sure it is <strong>uncompressed</strong>. Most image editing software (Photoshop, GIMP, Paint.NET) supports TGA export.
            </li>
            <li>
              <strong className="text-[#FF8000]">.BLP (Blizzard Texture)</strong>: This is WoW&apos;s proprietary texture format. It offers better compression and integration with the game engine, but you will need a conversion tool like <a href="https://www.wowinterface.com/downloads/info22128-BLPConverter.html" target="_blank" rel="noopener noreferrer" className="text-[#FF8000] hover:underline">BLPConverter</a> to create them. BLP is what Blizzard uses internally for all game textures.
            </li>
          </ul>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            2. Folder Structure
          </h2>
          <p>
            Keeping your files organized is critical, especially once your addon grows past a single Lua file. We recommend creating a dedicated <code>UI</code> subfolder inside your addon directory for all custom textures:
          </p>
          <div className="bg-obsidian border border-bone-white/10 p-6 rounded-md font-mono text-sm text-bone-white/80 overflow-x-auto shadow-inner my-4">
<pre>{`Interface/
  AddOns/
    YourAddonName/
      YourAddonName.toc
      YourAddonName.lua
      UI/
        logo.tga        -- Your addon icon (64x64)
        minimap.tga     -- Minimap button icon (32x32)
        banner.tga      -- Optional: settings panel header`}</pre>
          </div>
          <div className="bg-[#FF8000]/10 border border-[#FF8000]/30 p-6 my-6 text-sm">
            <strong className="text-[#FF8000] block mb-2 uppercase tracking-widest font-mono">Best Practice</strong>
            Always place custom textures inside your own addon&apos;s folder. Never reference textures from another addon&apos;s directory, as this creates fragile dependencies that break when the other addon updates or gets uninstalled.
          </div>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            3. The TOC File: Addon List Icon
          </h2>
          <p>
            To make your custom icon appear in the <strong>Interface Options</strong> menu and the <strong>AddOns list</strong> at the character select screen, you need to add the <code>## IconTexture</code> tag to your <code>.toc</code> manifest file.
          </p>
          <div className="bg-obsidian border border-bone-white/10 p-6 rounded-md font-mono text-sm text-bone-white/80 overflow-x-auto shadow-inner my-4">
<pre className="text-red-400">{`## Before (generic Blizzard icon ID):
## IconTexture: 134400`}</pre>
<pre className="text-green-400 mt-4">{`## After (your custom texture):
## IconTexture: Interface\\AddOns\\YourAddonName\\UI\\logo`}</pre>
          </div>
          <div className="bg-[#FF8000]/10 border border-[#FF8000]/30 p-6 my-6 text-sm">
            <strong className="text-[#FF8000] block mb-2 uppercase tracking-widest font-mono">Restart Required</strong>
            Changes to the <code>.toc</code> file are only read when the game client first launches. You cannot simply <code>/reload</code> to see metadata changes. You must fully close and restart WoW.
          </div>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            4. Lua Integration: Minimap Button Icons
          </h2>
          <p>
            Now for the exciting part: putting your custom logo on the actual in-game minimap button. In your UI Lua code, you reference the texture path using the <code>SetTexture</code> API method:
          </p>
          <div className="bg-obsidian border border-bone-white/10 p-6 rounded-md font-mono text-sm text-bone-white/80 overflow-x-auto shadow-inner my-4">
<pre><code className="text-green-400">-- Create a texture on your minimap button frame</code>
<code className="text-blue-300">local</code> <code className="text-white">icon =</code> <code className="text-yellow-200">minimapButton</code><code className="text-white">:</code><code className="text-yellow-200">CreateTexture</code><code className="text-orange-300">(nil, &quot;ARTWORK&quot;)</code>{"\n"}
{"\n"}
<code className="text-green-400">-- Point to your custom TGA/BLP file (omit the file extension!)</code>
<code className="text-white">icon:</code><code className="text-yellow-200">SetTexture</code><code className="text-orange-300">(&quot;Interface\\\\AddOns\\\\YourAddonName\\\\UI\\\\logo&quot;)</code>{"\n"}
{"\n"}
<code className="text-green-400">-- Size and position it relative to the button</code>
<code className="text-white">icon:</code><code className="text-yellow-200">SetSize</code><code className="text-orange-300">(20, 20)</code>{"\n"}
<code className="text-white">icon:</code><code className="text-yellow-200">SetPoint</code><code className="text-orange-300">(&quot;TOPLEFT&quot;, minimapButton, &quot;TOPLEFT&quot;, 7, -6)</code></pre>
          </div>
          <p>
            Notice the <strong>double backslashes</strong> (<code>\\</code>) in the Lua path. A single backslash is an escape character in Lua strings, so you must double it. Also notice that you <strong>omit the file extension</strong> (.tga or .blp). WoW resolves the correct file automatically.
          </p>

          <h2 className="text-2xl font-headline font-black text-white uppercase mt-12 mb-4 border-l-4 border-[#FF8000] pl-4">
            5. Testing Your Changes
          </h2>
          <p>
            How you test depends on what you changed:
          </p>
          <ul className="list-disc pl-6 space-y-3 text-bone-white/70">
            <li><strong className="text-[#FF8000]">Lua code only</strong> (e.g., changed the <code>SetTexture</code> path): Type <code>/reload</code> in game chat. Your minimap button and in-game textures will update instantly.</li>
            <li><strong className="text-[#FF8000]">Added new files or changed the .toc</strong>: You must close WoW completely and restart the game client. The .toc manifest is only parsed at launch.</li>
          </ul>

          <div className="bg-[#FF8000]/10 border border-[#FF8000]/30 p-6 my-6 text-sm">
            <strong className="text-[#FF8000] block mb-2 uppercase tracking-widest font-mono">Debugging Tip</strong>
            If your texture appears as a solid green box, it almost always means one of two things: the file dimensions are not a power of 2, or the file path in your Lua code has a typo. Double-check both before anything else.
          </div>
        </article>

        {/* CTA */}
        <section className="mt-16 bg-obsidian border border-[#FF8000]/40 p-8 text-center shadow-[0_0_30px_rgba(255,128,0,0.1)]">
          <h2 className="text-2xl font-headline font-black text-white uppercase mb-4">Want a professionally branded addon?</h2>
          <p className="text-white/60 mb-6 font-body text-sm max-w-xl mx-auto">
            Custom icons, polished minimap buttons, and studio-quality textures. We handle the branding so your addon looks as good as it performs.
          </p>
          <Link href={`/${locale}/#request`} className="inline-block bg-[#FF8000] text-obsidian px-8 py-4 font-label tracking-widest uppercase font-bold text-sm hover:bg-white transition-colors duration-300 transform hover:scale-105">
            Request a Custom Build
          </Link>
        </section>

        {/* Cross-links */}
        <nav className="mt-12 border-t border-[#FF8000]/20 pt-8">
          <h3 className="font-label text-xs text-[#FF8000]/60 uppercase tracking-widest mb-6">Continue Reading</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href={`/${locale}/how-to-create-wow-addons/coding-tutorial`} className="group block border border-[#FF8000]/20 p-4 hover:border-[#FF8000] transition-colors">
              <div className="font-mono text-[#FF8000]/60 text-xs mb-1">PART_03</div>
              <div className="font-headline text-sm font-bold text-bone-white uppercase group-hover:text-[#FF8000] transition-colors">Step-by-Step Tutorial: Writing Your First Addon</div>
            </Link>
            <Link href={`/${locale}/how-to-create-wow-addons/weakauras-vs-custom-addons`} className="group block border border-[#FF8000]/20 p-4 hover:border-[#FF8000] transition-colors">
              <div className="font-mono text-[#FF8000]/60 text-xs mb-1">PART_04</div>
              <div className="font-headline text-sm font-bold text-bone-white uppercase group-hover:text-[#FF8000] transition-colors">WeakAuras vs Custom Addons: Which Do You Need?</div>
            </Link>
          </div>
        </nav>
      </div>

      <Footer dict={dict} currentLocale={locale} />
    </main>
  );
}
