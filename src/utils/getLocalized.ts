import { Languages, Localized } from '@/i18n/config';

export default function getLocalized<T>(
    lang: Languages,
    item?: Localized<T>,
): T | null {
    if (item && item[lang]) {
        return item[lang];
    }

    return null;
};
