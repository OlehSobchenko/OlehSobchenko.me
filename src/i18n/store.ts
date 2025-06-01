import { cookies as clientCookies } from '@/utils/cookies';
import { Locale, hasLocale } from 'next-intl';
import { defaultLocale, locales } from '@/i18n/config';

export const LOCALE_COOKIE_NAME = 'language';

export async function getUserLocale(): Promise<Locale> {
    const candidate = clientCookies.get(LOCALE_COOKIE_NAME);

    return hasLocale(locales, candidate) ? candidate : defaultLocale;
}
