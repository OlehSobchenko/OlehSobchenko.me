import { setUserLocale } from '@/i18n/store';

export default function changeLocale(locale: string) {
    return setUserLocale(locale);
}
