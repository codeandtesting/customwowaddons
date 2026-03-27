Complete SEO Implementation Prompt for Next.js
Phase 1: Core SEO Foundation
1. Metadata & Head Management
TypeScript
Copy
// app/layout.tsx or pages/_app.tsx enhancements

// Install required package first:
// npm install next-seo

import { DefaultSeo } from 'next-seo';
import { Metadata } from 'next';

// Global SEO Configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: 'Your Brand Name | Main Keyword',
    template: '%s | Your Brand Name'
  },
  description: 'Compelling meta description with primary keywords (150-160 chars)',
  keywords: ['primary keyword', 'secondary keyword', 'brand terms'],
  authors: [{ name: 'Your Company' }],
  creator: 'Your Company',
  publisher: 'Your Company',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yourdomain.com',
    siteName: 'Your Brand Name',
    title: 'Your Brand Name | Main Keyword',
    description: 'Open Graph description',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Your Brand OG Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Brand Name',
    description: 'Twitter description',
    images: ['/twitter-image.jpg'],
    creator: '@yourhandle',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-code',
    yahoo: 'your-yahoo-code',
  },
  alternates: {
    canonical: 'https://yourdomain.com',
    languages: {
      'en-US': 'https://yourdomain.com/en',
      'de-DE': 'https://yourdomain.com/de',
    },
  },
  category: 'technology',
  classification: 'business',
  other: {
    'facebook-domain-verification': 'your-facebook-code',
  },
};

// Viewport configuration (separate export in Next.js 14+)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};
2. Dynamic Page Metadata Helper
TypeScript
Copy
// lib/seo.ts - Reusable SEO utilities

interface PageSEOProps {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export function generatePageSEO({
  title,
  description,
  image = '/default-og.jpg',
  noIndex = false,
  canonical,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
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
      type,
      images: [{ url: image, width: 1200, height: 630 }],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(authors && { authors }),
      ...(tags && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

// JSON-LD Structured Data Generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Your Company Name',
    url: 'https://yourdomain.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://yourdomain.com/logo.png',
      width: 512,
      height: 512,
    },
    sameAs: [
      'https://twitter.com/yourhandle',
      'https://linkedin.com/company/yourcompany',
      'https://facebook.com/yourpage',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-xxx-xxx-xxxx',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Your Site Name',
    url: 'https://yourdomain.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://yourdomain.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
Phase 2: Page-Level Implementation
3. Dynamic Page Template
TypeScript
Copy
// app/[slug]/page.tsx or pages/[slug].tsx

import { Metadata } from 'next';
import { generatePageSEO, generateBreadcrumbSchema } from '@/lib/seo';
import Script from 'next/script';

// Generate metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = await fetchPageData(params.slug);
  
  return generatePageSEO({
    title: `${pageData.title} | Your Brand`,
    description: pageData.excerpt || pageData.metaDescription,
    image: pageData.featuredImage,
    type: 'article',
    publishedTime: pageData.publishedAt,
    modifiedTime: pageData.updatedAt,
    authors: pageData.authors?.map(a => a.name),
    tags: pageData.tags,
    canonical: `https://yourdomain.com/${params.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const pageData = await fetchPageData(params.slug);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://yourdomain.com' },
    { name: pageData.category, url: `https://yourdomain.com/category/${pageData.categorySlug}` },
    { name: pageData.title, url: `https://yourdomain.com/${params.slug}` },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      {/* Article Schema */}
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: pageData.title,
            description: pageData.excerpt,
            image: pageData.featuredImage,
            datePublished: pageData.publishedAt,
            dateModified: pageData.updatedAt,
            author: {
              '@type': 'Person',
              name: pageData.author.name,
              url: pageData.author.profileUrl,
            },
            publisher: {
              '@type': 'Organization',
              name: 'Your Brand',
              logo: {
                '@type': 'ImageObject',
                url: 'https://yourdomain.com/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://yourdomain.com/${params.slug}`,
            },
          }),
        }}
      />
      
      <article>
        {/* Page content */}
      </article>
    </>
  );
}
Phase 3: Technical SEO Infrastructure
4. Next.js Configuration (next.config.js)
JavaScript
Copy
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.your-cdn.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Trailing slashes for consistency
  trailingSlash: true,
  
  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 301 redirect
      },
      // www to non-www redirect
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.yourdomain.com' }],
        destination: 'https://yourdomain.com/:path*',
        permanent: true,
      },
    ];
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Cache control for static assets
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Specific headers for HTML pages
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Critical CSS extraction
    if (!isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
5. Robots.txt & Sitemap Generation
TypeScript
Copy
// app/robots.ts (App Router) or pages/api/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/private/',
          '/admin/',
          '/draft/',
          '/*.json$',
          '/*.xml$',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
    ],
    sitemap: 'https://yourdomain.com/sitemap.xml',
    host: 'https://yourdomain.com',
  };
}

// app/sitemap.ts - Dynamic sitemap generation
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all dynamic routes
  const [posts, pages, products] = await Promise.all([
    fetchPosts(),
    fetchPages(),
    fetchProducts(),
  ]);

  const staticRoutes = [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://yourdomain.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ];

  const dynamicRoutes = [
    ...posts.map(post => ({
      url: `https://yourdomain.com/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...products.map(product => ({
      url: `https://yourdomain.com/products/${product.slug}`,
      lastModified: product.updatedAt,
      changeFrequency: 'daily' as const,
      priority: 0.9,
      // Image sitemap extension
      images: product.images.map(img => ({
        loc: img.url,
        caption: img.alt,
        title: product.name,
      })),
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
6. Advanced Sitemap (with images, videos, news)
TypeScript
Copy
// lib/sitemap-generator.ts for complex sitemaps

interface SitemapImage {
  loc: string;
  caption?: string;
  title?: string;
  geo_location?: string;
  license?: string;
}

interface SitemapVideo {
  thumbnail_loc: string;
  title: string;
  description: string;
  content_loc?: string;
  player_loc?: string;
  duration?: number;
  expiration_date?: string;
  rating?: number;
  view_count?: number;
  publication_date?: string;
  family_friendly?: boolean;
  restriction?: {
    relationship: 'allow' | 'deny';
    countries: string;
  };
  price?: {
    currency: string;
    value: number;
    type: 'rent' | 'purchase';
  };
  requires_subscription?: boolean;
  uploader?: {
    name: string;
    info?: string;
  };
  live?: boolean;
}

export function generateImageSitemap(
  baseUrl: string,
  images: Array<{ url: string; pages: string[]; details: SitemapImage }>
): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${images.map(img => `
  <url>
    <loc>${baseUrl}${img.pages[0]}</loc>
    ${img.pages.map(page => `
    <image:image>
      <image:loc>${baseUrl}${img.url}</image:loc>
      ${img.details.caption ? `<image:caption>${escapeXml(img.details.caption)}</image:caption>` : ''}
      ${img.details.title ? `<image:title>${escapeXml(img.details.title)}</image:title>` : ''}
    </image:image>`).join('')}
  </url>
`).join('')}
</urlset>`;
  return xml;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
Phase 4: Performance & Core Web Vitals
7. Performance Optimizations Component
TypeScript
Copy
// components/PerformanceSEO.tsx

import Script from 'next/script';
import Head from 'next/head';

export function PerformanceSEO() {
  return (
    <>
      <Head>
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://your-cdn.com" />
        <link rel="dns-prefetch" href="https://analytics.google.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/critical.css" as="style" />
        
        {/* Prefetch likely navigation */}
        <link rel="prefetch" href="/about" />
        <link rel="prefetch" href="/contact" />
      </Head>

      {/* Analytics with partytown for offloading */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
        strategy="worker"
        id="gtag-init"
      />
      <Script
        id="gtag-config"
        strategy="worker"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            ggtag('js', new Date());
            ggtag('config', 'GA_ID', {
              page_path: window.location.pathname,
              send_page_view: false // Manually control to prevent duplicate
            });
          `,
        }}
      />

      {/* Schema.org WebSite structured data */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Your Site',
            url: 'https://yourdomain.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://yourdomain.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </>
  );
}
8. Image SEO Component
TypeScript
Copy
// components/SEOImage.tsx
import Image from 'next/image';

interface SEOImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  caption?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  className?: string;
  sizes?: string;
}

export function SEOImage({
  src,
  alt,
  width,
  height,
  priority = false,
  caption,
  objectFit = 'cover',
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
}: SEOImageProps) {
  // Validate alt text
  const validatedAlt = alt || 'Image'; // Fallback, but should always provide meaningful alt
  
  return (
    <figure className={className}>
      <Image
        src={src}
        alt={validatedAlt}
        width={width}
        height={height}
        priority={priority}
        quality={85}
        sizes={sizes}
        style={{ objectFit }}
        loading={priority ? 'eager' : 'lazy'}
        // Generate srcset automatically via Next.js
        placeholder="blur" // Use blur placeholder for LCP images
        blurDataURL="data:image/jpeg;base64,..." // Base64 blur hash
      />
      {caption && (
        <figcaption className="text-sm text-gray-600 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
Phase 5: Advanced SEO Features
9. Internationalization (i18n) SEO
TypeScript
Copy
// middleware.ts for locale handling
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'de', 'fr', 'es'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname already has locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return;
  
  // Detect locale from header or use default
  const locale = request.headers.get('accept-language')?.split(',')[0].split('-')[0] || defaultLocale;
  const validLocale = locales.includes(locale) ? locale : defaultLocale;
  
  // Redirect to locale-prefixed path
  request.nextUrl.pathname = `/${validLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};

// app/[locale]/layout.tsx
import { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    alternates: {
      canonical: `https://yourdomain.com/${locale}`,
      languages: {
        'en-US': 'https://yourdomain.com/en',
        'de-DE': 'https://yourdomain.com/de',
        'fr-FR': 'https://yourdomain.com/fr',
        'x-default': 'https://yourdomain.com',
      },
    },
  };
}
10. Breadcrumbs Component with Schema
TypeScript
Copy
// components/Breadcrumbs.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

interface BreadcrumbItem {
  name: string;
  url: string;
  isLast?: boolean;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className="py-4">
        <ol className="flex items-center space-x-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
          {items.map((item, index) => (
            <li 
              key={item.url}
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
              className="flex items-center"
            >
              {index > 0 && <span className="mx-2 text-gray-400">/</span>}
              {item.isLast ? (
                <span itemProp="name" className="text-gray-600" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.url} itemProp="item" className="text-blue-600 hover:underline">
                  <span itemProp="name">{item.name}</span>
                </Link>
              )}
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
11. FAQ Schema Component
TypeScript
Copy
// components/FAQSchema.tsx
import Script from 'next/script';

interface FAQ {
  question: string;
  answer: string;
}

export function FAQSchema({ faqs }: { faqs: FAQ[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <details key={index} className="group border rounded-lg p-4">
            <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
              {faq.question}
              <span className="transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 group-open:animate-fadeIn">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </>
  );
}
Phase 6: Monitoring & Validation
12. SEO Monitoring Hook
TypeScript
Copy
// hooks/useSEO.ts
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function useSEO() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page views for SEO analysis
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Send to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_ID', {
        page_path: url,
        page_title: document.title,
      });
    }

    // Log for debugging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('SEO Debug:', {
        url,
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
      });
    }
  }, [pathname, searchParams]);
}

// components/SEOChecker.tsx - Development helper
'use client';

import { useEffect } from 'react';

export function SEOChecker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const checks = {
      title: document.title.length > 0 && document.title.length <= 60,
      description: (() => {
        const desc = document.querySelector('meta[name="description"]')?.getAttribute('content');
        return desc && desc.length >= 50 && desc.length <= 160;
      })(),
      canonical: !!document.querySelector('link[rel="canonical"]'),
      ogImage: !!document.querySelector('meta[property="og:image"]'),
      h1: document.querySelectorAll('h1').length === 1,
      structuredData: document.querySelectorAll('script[type="application/ld+json"]').length > 0,
    };

    const failed = Object.entries(checks).filter(([_, pass]) => !pass);
    
    if (failed.length > 0) {
      console.warn('SEO Issues Found:', failed.map(([key]) => key));
    }
  }, []);

  return null;
}
Phase 7: E-commerce/Product SEO (if applicable)
13. Product Schema
TypeScript
Copy
// lib/product-schema.ts

interface ProductSEOProps {
  name: string;
  description: string;
  image: string[];
  sku: string;
  brand: string;
  offers: {
    price: number;
    priceCurrency: string;
    availability: 'InStock' | 'OutOfStock' | 'PreOrder';
    url: string;
    priceValidUntil?: string;
    itemCondition?: string;
  };
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
  reviews?: Array<{
    author: string;
    datePublished: string;
    reviewBody: string;
    reviewRating: number;
  }>;
}

export function generateProductSchema(props: ProductSEOProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: props.name,
    description: props.description,
    image: props.image,
    sku: props.sku,
    brand: {
      '@type': 'Brand',
      name: props.brand,
    },
    offers: {
      '@type': 'Offer',
      url: props.offers.url,
      priceCurrency: props.offers.priceCurrency,
      price: props.offers.price,
      availability: `https://schema.org/${props.offers.availability}`,
      priceValidUntil: props.offers.priceValidUntil,
      itemCondition: props.offers.itemCondition || 'https://schema.org/NewCondition',
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
    ...(props.aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: props.aggregateRating.ratingValue,
        reviewCount: props.aggregateRating.reviewCount,
      },
    }),
    ...(props.reviews && {
      review: props.reviews.map(review => ({
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author,
        },
        datePublished: review.datePublished,
        reviewBody: review.reviewBody,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.reviewRating,
        },
      })),
    }),
  };
}
Implementation Checklist
Critical Priority (Must Have)
✅ Install next-seo package
✅ Configure root layout metadata with all essential tags
✅ Set up dynamic metadata generation for all pages
✅ Create robots.ts and sitemap.ts
✅ Configure next.config.js with redirects and headers
✅ Implement Core Web Vitals optimizations (images, fonts, scripts)
✅ Add Organization and WebSite structured data
High Priority (Should Have)
✅ Implement breadcrumb schema on all pages
✅ Add Article/Product schemas where applicable
✅ Set up internationalization with hreflang tags
✅ Create SEO image component with proper optimization
✅ Implement FAQ schema for relevant pages
Medium Priority (Nice to Have)
✅ Add video schema for video content
✅ Implement local business schema (if applicable)
✅ Create review/rating schemas
✅ Set up SEO monitoring and validation hooks
