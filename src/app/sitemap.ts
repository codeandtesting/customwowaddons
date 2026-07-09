import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.customwowaddon.com";
  const locales = ["en", "de", "fr", "es", "ru", "zh"];

  const routes: MetadataRoute.Sitemap = [];

  // Homepages
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });
  });

  // Terms and Privacy
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}/terms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    });
    routes.push({
      url: `${baseUrl}/${locale}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    });
  });

  // Spritesheet Converter
  locales.forEach((locale) => {
    routes.push({
      url: `${baseUrl}/${locale}/gif-to-tga-converter`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  // Guides
  const guides = [
    "",
    "/what-is-an-addon",
    "/programming-language",
    "/coding-tutorial",
    "/weakauras-vs-custom-addons",
    "/branding-guide"
  ];

  locales.forEach((locale) => {
    guides.forEach((guide) => {
      routes.push({
        url: `${baseUrl}/${locale}/how-to-create-wow-addons${guide}`,
        lastModified: new Date(),
        changeFrequency: guide === "" ? "weekly" : "monthly",
        priority: guide === "/what-is-an-addon" ? 1.0 : (guide === "" ? 0.8 : 0.7),
      });
    });
  });

  return routes;
}
