import { Metadata } from "next";

const SITE_URL = "https://www.customwowaddon.com";
const SITE_NAME = "The Lav Forge";
const SITE_DESCRIPTION =
  "Custom World of Warcraft Addons & WeakAuras built from scratch. Elite Lua development studio for personal addons, casino systems, UI suites, and pro WeakAura engineering.";

interface PageSEOProps {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
  datePublished?: string;
}

export function generatePageSEO({
  title,
  description,
  image = "/og-image.png",
  noIndex = false,
  canonical,
  datePublished,
}: PageSEOProps): Metadata {
  return {
    title,
    description,
    robots: noIndex ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: canonical || undefined,
    },
    openGraph: {
      title,
      description,
      type: datePublished ? "article" : "website",
      images: [{ url: image, width: 1200, height: 630 }],
      ...(datePublished && { publishedTime: datePublished, modifiedTime: datePublished }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    sameAs: ["https://discord.gg/yESkPhPBZn"],
    description: SITE_DESCRIPTION,
    foundingDate: "2026",
    knowsAbout: [
      "World of Warcraft Addons",
      "WeakAuras Development",
      "Lua Programming",
      "WoW UI Development",
      "Custom Gaming Software",
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Custom WoW Addon Development",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    name: "Custom World of Warcraft Addon & WeakAura Development",
    description: SITE_DESCRIPTION,
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "WoW Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Addon Development",
            description:
              "Full Lua addon development from scratch. Auction scanners, guild tools, PvP trackers, and more.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pro WeakAura Engineering",
            description:
              "Complex WeakAura suites with custom trigger logic, raid-specific alerts, and predictive resource tracking.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI Suite Configuration",
            description:
              "Complete interface overhauls with ElvUI, Plater, and Details. Pixel-perfect alignment for any class.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "WoW Casino Addon Systems",
            description:
              "Automated in-game casino systems including Blackjack 13, Blackjack 100, and Worn Troll Dice.",
          },
        },
      ],
    },
  };
}

export function generateArticleSchema({
  title,
  description,
  url,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: `${SITE_URL}/og-image.jpg`,
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export { SITE_URL, SITE_NAME, SITE_DESCRIPTION };
