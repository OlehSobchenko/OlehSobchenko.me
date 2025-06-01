import { Languages, Localization } from '@/i18n/config';

export default function getLocalized(
    item: Localization | string | null | undefined,
    lang: Languages,
): string | null {
    if (typeof item === 'string') {
        return item;
    }

    if (item && item[lang]) {
        return item[lang];
    }

    return null;
};
