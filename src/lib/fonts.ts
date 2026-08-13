import { Inter, Space_Grotesk, JetBrains_Mono, Noto_Sans_SC, Noto_Naskh_Arabic } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const notoSansSC = Noto_Sans_SC({
  preload: false,
  display: 'swap',
  variable: '--font-noto-sans-sc',
});

export const notoNaskhArabic = Noto_Naskh_Arabic({
  preload: false,
  display: 'swap',
  variable: '--font-noto-naskh-arabic',
});

export const localeFontVariables: Record<string, string> = {
  zh: notoSansSC.variable,
  ar: notoNaskhArabic.variable,
};

export const baseFontVariables = `${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`;