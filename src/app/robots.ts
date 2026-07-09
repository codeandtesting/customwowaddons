import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
      {
        userAgent: [
          "GPTBot", 
          "ClaudeBot", 
          "anthropic-ai", 
          "CCBot", 
          "Google-Extended", 
          "PerplexityBot", 
          "Bytespider", 
          "DeepSeek", 
          "meta-externalagent"
        ],
        allow: "/",
        crawlDelay: 10,
      },
    ],
    sitemap: "https://www.customwowaddon.com/sitemap.xml",
    host: "https://www.customwowaddon.com",
  };
}
