import type { MetadataRoute } from "next";
import { LOCALES, localeUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const homePages = LOCALES.map((lang) => ({
    url: localeUrl(lang),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: lang === "en" ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((locale) => [locale, localeUrl(locale)])),
    },
  }));

  const caseStudies = LOCALES.map((lang) => ({
    url: localeUrl(lang, "/work/ai-construction-takeoff"),
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...homePages, ...caseStudies];
}
