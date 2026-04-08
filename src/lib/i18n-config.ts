export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'de', 'fr', 'es', 'ru', 'zh'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
