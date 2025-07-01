export type Languages = 'uk' | 'en';

export type Localized<T = string> = Record<Languages, T>;

export const defaultLocale: Languages = 'uk';

export const languages: Localized = {
    uk: 'Українська',
    en: 'English',
};

export const locales = <Languages[]>Object.keys(languages);
