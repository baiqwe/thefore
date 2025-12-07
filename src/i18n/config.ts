// i18n Configuration for The Forge Wiki
// Targeting Southeast Asian markets based on traffic data

export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'id', 'th', 'vi', 'zh', 'ms'],
} as const

export type Locale = (typeof i18n)['locales'][number]

export const languages = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
    dir: 'ltr',
  },
  id: {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩',
    dir: 'ltr',
  },
  th: {
    code: 'th',
    name: 'Thai',
    nativeName: 'ภาษาไทย',
    flag: '🇹🇭',
    dir: 'ltr',
  },
  vi: {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    dir: 'ltr',
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '简体中文',
    flag: '🇨🇳',
    dir: 'ltr',
  },
  ms: {
    code: 'ms',
    name: 'Malay',
    nativeName: 'Bahasa Melayu',
    flag: '🇲🇾',
    dir: 'ltr',
  },
} as const

// Helper function to get language metadata
export function getLanguage(locale: Locale) {
  return languages[locale] || languages.en
}

// Helper function to check if locale is valid
export function isValidLocale(locale: string): locale is Locale {
  return i18n.locales.includes(locale as Locale)
}
