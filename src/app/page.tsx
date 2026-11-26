import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'ha', 'fr', 'zh', 'es', 'ar'];
const defaultLocale = 'en';

async function getLocale(): Promise<string> {
  const negotiatorHeaders: Record<string, string> = {};
  const headerList = await headers();
  headerList.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  
  try {
    return match(languages, locales, defaultLocale);
  } catch {
    return defaultLocale;
  }
}

export default async function Home() {
  const locale = await getLocale();
  redirect(`/${locale}`);
}
