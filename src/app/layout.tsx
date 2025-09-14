
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

// This function is now part of the root layout to avoid duplication
function getLocale(): string {
  const locales = ['en', 'ha', 'fr', 'zh', 'es', 'ar'];
  const defaultLocale = 'en';
  const negotiatorHeaders: Record<string, string> = {};
  headers().forEach((value, key) => (negotiatorHeaders[key] = value));
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  try {
    return match(languages, locales, defaultLocale);
  } catch (error) {
    return defaultLocale;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = getLocale();
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  };
}

const rtlLocales = ['ar'];

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  // Use params.lang if available (from URL), otherwise detect from headers
  const lang = params?.lang || getLocale();
  const isRtl = rtlLocales.includes(lang);
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} dir={isRtl ? 'rtl' : 'ltr'} className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header lang={lang} dictionary={dictionary.nav} />
          <main className="overflow-x-hidden">{children}</main>
          <Footer lang={lang} />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
