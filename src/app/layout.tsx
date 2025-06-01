import './globals.css';
import type { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { PropsWithChildren } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { LocaleProvider } from '@/components/providers/LocaleProvider';

const robotoCondensed = Roboto_Condensed({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-roboto-condensed',
    display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('main');

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function RootLayout(
    { children }: PropsWithChildren,
) {
    const locale = await getLocale();

    return <html lang={ locale } suppressHydrationWarning>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body
            className={ `${ robotoCondensed.className } bg-main-background text-main-color font-bold fill-main-color overflow-x-hidden` }
            suppressHydrationWarning
        >
            <ThemeProvider>
                <LocaleProvider>
                    { children }
                </LocaleProvider>
            </ThemeProvider>
        </body>
    </html>;
}
