import { useLocale as useLocaleOriginal } from 'next-intl';
import { Languages } from '@/i18n/config';

export default function useLocale() {
    return useLocaleOriginal() as Languages;
}
