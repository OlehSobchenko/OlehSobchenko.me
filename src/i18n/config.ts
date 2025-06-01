export type Languages = 'uk' | 'en';

export type Localization = Record<Languages, string>;

export const defaultLocale: Languages = 'uk';

export const languages: Localization = {
    uk: 'Українська',
    en: 'English',
};

export const locales = <Languages[]>Object.keys(languages);

// This is used for static export with Next.js app router
export const getLocaleStaticParams = () => {
    return locales.map(locale => ({ locale }));
};
