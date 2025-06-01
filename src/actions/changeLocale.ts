'use server';

import { setUserLocale } from '@/i18n/store';

export default async function changeLocale(locale: string) {
    return setUserLocale(locale);
}