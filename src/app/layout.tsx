
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { getDictionary } from '@/lib/dictionaries';
import { headers } from 'next/headers';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { ScrollToTop } from '@/components/common/scroll-to-top';
import { SocialRail } from '@/components/common/social-rail';
import { ChatbotWidget } from '@/components/chatbot/chatbot-widget';
import { baseFontVariables, localeFontVariables } from '@/lib/fonts';
import { CONTACT_EMAIL, GITHUB_URL, TELEGRAM_URL } from '@/lib/data';
import { DEFAULT_LOCALE, LOCALES, OG_IMAGE, SEO_KEYWORDS, SITE_URL, localeUrl } from '@/lib/site';

// This function is now part of the root layout to avoid duplication
async function getLocale(): Promise<string> {
  const locales: readonly string[] = LOCALES;
  const defaultLocale = DEFAULT_LOCALE;
  const headerList = await headers();

  // Prefer the locale derived from the URL path by the proxy
  const pathLocale = headerList.get('x-locale');
  if (pathLocale && locales.includes(pathLocale)) {
    return pathLocale;
  }

  const negotiatorHeaders: Record<string, string> = {};
  headerList.forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  try {
    return match(languages, locales, defaultLocale);
  } catch {
    return defaultLocale;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const dictionary = await getDictionary(lang);

  const canonical = localeUrl(lang);
  const languageAlternates = Object.fromEntries([
    ["x-default", localeUrl(DEFAULT_LOCALE)],
    ...LOCALES.map((locale) => [locale, localeUrl(locale)]),
  ]);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dictionary.metadata.title,
      template: "%s | Emmanuel Galadima",
    },
    description: dictionary.metadata.description,
    applicationName: "Emmanuel Galadima",
    authors: [{ name: "Emmanuel Galadima", url: SITE_URL }],
    creator: "Emmanuel Galadima",
    publisher: "Emmanuel Galadima",
    keywords: SEO_KEYWORDS,
    category: "portfolio",
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    openGraph: {
      type: "website",
      siteName: "Emmanuel Galadima",
      locale: lang,
      alternateLocale: LOCALES.filter((locale) => locale !== lang),
      url: canonical,
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      site: "@CripticHood",
      creator: "@CripticHood",
      images: [OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#131516" },
  ],
};

const rtlLocales = ['ar'];

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: {};
  }>
) {
  const {
    children
  } = props;

  // Detect the locale from request headers
  const lang = await getLocale();
  const isRtl = rtlLocales.includes(lang);
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} dir={isRtl ? 'rtl' : 'ltr'} className={`!scroll-smooth ${baseFontVariables} ${localeFontVariables[lang] ?? ''}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Emmanuel Galadima",
              "jobTitle": "AI Full-Stack Software Engineer",
              "description": "I design and build software that combines full-stack engineering, AI, and security-minded architecture.",
              "url": SITE_URL,
              "image": OG_IMAGE.url,
              "email": CONTACT_EMAIL,
              "knowsLanguage": ["en", "ha", "fr", "es", "zh", "ar"],
              "knowsAbout": ["Full-stack engineering", "AI engineering", "Product engineering", "Application security", "Web3"],
              "sameAs": [
                GITHUB_URL,
                "https://www.linkedin.com/in/emmanuel-galadima/",
                "https://twitter.com/CripticHood",
                TELEGRAM_URL,
                "https://linktr.ee/CripticHood"
              ]
            }),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header lang={lang} dictionary={dictionary.nav} />
          <SocialRail lang={lang} />
          <main className="overflow-x-hidden lg:ps-20">{children}</main>
          <Footer lang={lang} />
          <Toaster />
          <div className="fixed bottom-24 end-4 z-40">
            <ScrollToTop />
          </div>
          <ChatbotWidget dictionary={dictionary.chatbot} />
        </ThemeProvider>
      </body>
    </html>
  );
}
