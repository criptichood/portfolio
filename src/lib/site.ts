export const SITE_URL = "https://criptichood.com";

export const LOCALES = ["en", "ha", "fr", "zh", "es", "ar"] as const;

export const DEFAULT_LOCALE = "en";

export const OG_IMAGE = {
  url: "https://res.cloudinary.com/dlbcsvcys/image/upload/v1757885748/m3_q3yrqs.png",
  width: 1200,
  height: 1200,
  alt: "Emmanuel Galadima",
};

export const SEO_KEYWORDS = [
  "Emmanuel Galadima",
  "Criptic Hood",
  "AI full-stack engineer",
  "Next.js developer",
  "AI engineer",
  "product engineer",
  "GrowencyAI",
  "iBuild3",
];

export function localeUrl(lang: string, path = "") {
  return `${SITE_URL}/${lang}${path}`;
}
