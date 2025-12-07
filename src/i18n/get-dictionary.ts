import 'server-only'
import type { Locale } from './config'

// Dictionary type for type safety
export type Dictionary = {
    nav: {
        home: string
        guides: string
        items: string
        codes: string
        tools: string
        races: string
        tierList: string
        blog: string
        help: string
        about: string
        contact: string
        privacy: string
        terms: string
    }
    common: {
        readMore: string
        learnMore: string
        getStarted: string
        search: string
        loading: string
        error: string
        notFound: string
        backToHome: string
        share: string
        copy: string
        copied: string
        close: string
        menu: string
        language: string
    }
    footer: {
        description: string
        quickLinks: string
        resources: string
        legal: string
        followUs: string
        copyright: string
    }
    seo: {
        defaultTitle: string
        defaultDescription: string
    }
}

const dictionaries = {
    en: () => import('./dictionaries/en.json').then((module) => module.default),
    id: () => import('./dictionaries/id.json').then((module) => module.default),
    th: () => import('./dictionaries/th.json').then((module) => module.default),
    vi: () => import('./dictionaries/vi.json').then((module) => module.default),
    zh: () => import('./dictionaries/zh.json').then((module) => module.default),
    ms: () => import('./dictionaries/ms.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
    const dict = dictionaries[locale] || dictionaries.en
    return dict()
}
