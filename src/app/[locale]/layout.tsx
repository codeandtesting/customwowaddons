import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Playfair_Display, Cinzel, Inter, Space_Grotesk, Fira_Code } from "next/font/google";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateServiceSchema,
  SITE_URL,
  SITE_NAME,
} from "@/lib/seo";
import { i18n, Locale } from "@/lib/i18n-config";
import { getDictionary } from "@/lib/get-dictionary";
import React from "react";

// Components & Global Styles
import OceanBackground from "@/components/OceanBackground";
import LangUpdater from "@/app/LangUpdater";
import "@/app/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "700", "900"],
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  weight: ["400", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-label",
  weight: ["300", "400", "700"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const dict = await getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${dict.brand} | ${dict.hero.title.part1} ${dict.hero.title.accent1} ${dict.hero.title.part2} ${dict.hero.title.accent2}`,
      template: `%s | ${dict.brand}`,
    },
    description: dict.hero.description,
    keywords: [
      "custom wow addons",
      "weakaura development",
      "world of warcraft addons",
      "wow lua developer",
      "custom weakauras",
      "wow ui development",
      "elvui setup",
      "wow casino addon",
      "blackjack 13 wow",
      "wow addon developer",
      "custom wow ui",
      "personal weakauras",
      "wow addon studio",
      "the lav forge",
      "midnight expansion addons",
      "tbc classic addons",
      "wow plater profiles",
      "worn troll dice addon",
    ],
    authors: [{ name: dict.brand }],
    creator: dict.brand,
    publisher: dict.brand,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large" as const,
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : locale,
      url: SITE_URL,
      siteName: dict.brand,
      title: `${dict.brand} | Custom WoW Addon Development`,
      description: dict.hero.description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${dict.brand} - Custom WoW Addon Development Studio`,
        },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        de: `${SITE_URL}/de`,
        fr: `${SITE_URL}/fr`,
        es: `${SITE_URL}/es`,
        ru: `${SITE_URL}/ru`,
        zh: `${SITE_URL}/zh`,
      },
    },
    icons: {
      icon: [
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon.ico" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    category: "gaming",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0A0D" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  
  // Conditionally select the headline font based on locale
  const headlineVar = locale === "ru" ? "var(--font-playfair)" : "var(--font-cinzel)";

  return (
    <html lang={locale} className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <LangUpdater />
      </head>
      <body
        className={`${playfair.variable} ${cinzel.variable} ${inter.variable} ${spaceGrotesk.variable} ${firaCode.variable} font-body bg-obsidian text-bone-white`}
        style={{ "--font-headline": headlineVar } as React.CSSProperties}
      >
        <OceanBackground />
        {/* JSON-LD Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebSiteSchema()),
          }}
        />
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateServiceSchema()),
          }}
        />
        {children}
      </body>
    </html>
  );
}
