import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'ha', 'fr', 'zh', 'es', 'ar'];
const defaultLocale = 'en';

function getLocale(): string {
  const negotiatorHeaders: Record<string, string> = {};
  headers().forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  try {
    return match(languages, locales, defaultLocale);
  } catch (error) {
    return defaultLocale;
  }
}

export default function Home() {
  const locale = getLocale();
  redirect(`/${locale}/home`);
}
