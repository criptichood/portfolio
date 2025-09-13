
import type { Metadata } from 'next';
import '../globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { getDictionary } from '@/lib/dictionaries';

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
  };
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={params.lang} className="!scroll-smooth" suppressHydrationWarning>
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
          <Header lang={params.lang} />
          <main className="overflow-x-hidden">{children}</main>
          <Footer lang={params.lang} />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
