import type { Metadata, Viewport } from "next";
import { Cinzel, Inter, Space_Grotesk, Fira_Code } from "next/font/google";
import Script from "next/script";
import OceanBackground from "@/components/OceanBackground";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateServiceSchema,
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
} from "@/lib/seo";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-headline",
  weight: ["400", "700", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-label",
  weight: ["300", "400", "700"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Custom WoW Addons & WeakAuras`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
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
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
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
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | Custom WoW Addons & WeakAuras`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Lav Forge - Custom WoW Addon Development Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Custom WoW Addons & WeakAuras`,
    description: SITE_DESCRIPTION,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0A0D" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
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
      </head>
      <body
        className={`${cinzel.variable} ${inter.variable} ${spaceGrotesk.variable} ${firaCode.variable} font-body`}
      >
        <OceanBackground />
        {children}
      </body>
    </html>
  );
}
