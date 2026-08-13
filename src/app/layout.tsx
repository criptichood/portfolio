
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

// This function is now part of the root layout to avoid duplication
async function getLocale(): Promise<string> {
  const locales = ['en', 'ha', 'fr', 'zh', 'es', 'ar'];
  const defaultLocale = 'en';
  const negotiatorHeaders: Record<string, string> = {};
  const headerList = await headers();
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
  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
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
    <html lang={lang} dir={isRtl ? 'rtl' : 'ltr'} className="!scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Emmanuel Galadima",
              "jobTitle": "AI Full-Stack Software Engineer",
              "description": "I design and build intelligent, production-ready software systems — combining full-stack engineering, AI, and security-minded architecture.",
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
