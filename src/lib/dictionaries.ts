
import 'server-only';
import type { Dictionary } from '@/types/dictionary';

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import('@/lib/dictionaries/en.json').then((module) => module.default),
  ha: () => import('@/lib/dictionaries/ha.json').then((module) => module.default),
  fr: () => import('@/lib/dictionaries/fr.json').then((module) => module.default),
  zh: () => import('@/lib/dictionaries/zh.json').then((module) => module.default),
  es: () => import('@/lib/dictionaries/es.json').then((module) => module.default),
  ar: () => import('@/lib/dictionaries/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  if (dictionaries[locale]) {
    return dictionaries[locale]();
  }
  // Fallback to English if the locale is not found
  return dictionaries.en();
};
