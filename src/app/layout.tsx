
import type { Metadata } from 'next';
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

// This function is now part of the root layout to avoid duplication
async function getLocale(): Promise<string> {
  const locales = ['en', 'ha', 'fr', 'zh', 'es', 'ar'];
  const defaultLocale = 'en';
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
  } catch (error) {
    return defaultLocale;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLocale();
  const dictionary = await getDictionary(lang);

  const canonical = `https://criptichood.com/${lang}`;

  return {
    metadataBase: new URL('https://criptichood.com'),
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    applicationName: 'Emmanuel Galadima',
    alternates: {
      canonical,
      languages: {
        'en': '/en',
        'ha': '/ha',
        'fr': '/fr',
        'es': '/es',
        'zh': '/zh',
        'ar': '/ar',
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'Emmanuel Galadima',
      locale: lang,
      url: canonical,
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
    },
    twitter: {
      card: 'summary',
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      creator: '@CripticHood',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
              "url": "https://criptichood.com",
              "sameAs": [
                "https://github.com/criptichood",
                "https://www.linkedin.com/in/emmanuel-galadima/",
                "https://twitter.com/CripticHood"
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
          <div className="fixed bottom-4 right-4 z-40">
            <ScrollToTop />
          </div>
          <ChatbotWidget dictionary={dictionary.chatbot} />
        </ThemeProvider>
      </body>
    </html>
  );
}
