import { cookies as clientCookies } from '@/utils/cookies';
import { Locale, hasLocale } from 'next-intl';
import { defaultLocale, locales } from '@/i18n/config';

const COOKIE_NAME = 'NEXT_LOCALE';

export async function getUserLocale(): Promise<Locale> {
    const candidate = clientCookies.get(COOKIE_NAME);

    return hasLocale(locales, candidate) ? candidate : defaultLocale;
}

export async function setUserLocale(locale: string) {
    return clientCookies.set(COOKIE_NAME, locale);
}
