import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';

export const metadata: Metadata = {
  title: 'Criptic Digital - AI & Web Development',
  description: 'Helping businesses and companies build and upgrade websites, maintain systems, and adopt AI-driven solutions for growth.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Header />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
