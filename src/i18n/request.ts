import { getRequestConfig, RequestConfig } from 'next-intl/server';
import { getUserLocale } from '@/i18n/store';

export default getRequestConfig(async () => {
    const locale = await getUserLocale();

    return {
        locale,
        messages: (await import(`@/messages/${ locale }.json`)).default,
    } as unknown as RequestConfig;
});
