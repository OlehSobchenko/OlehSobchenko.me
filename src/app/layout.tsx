import 'react-datepicker/dist/react-datepicker.css';
import '@/app/globals.css';
import '@/styles/datepicker.css';
import type { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { PropsWithChildren } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
import { PostsProvider } from '@/components/providers/PostsProvider';

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
        icons: {
            icon: [
                { url: '/favicon.ico' },
                {
                    url: '/favicon-32x32.png',
                    sizes: '32x32',
                    type: 'image/png',
                },
                {
                    url: '/favicon-16x16.png',
                    sizes: '16x16',
                    type: 'image/png',
                },
            ],
            apple: '/apple-touch-icon.png',
        },
        manifest: '/site.webmanifest',
        applicationName: t('title'),
        keywords: [
            'Oleh',
            'Sobchenko',
            'Oleh Sobchenko',
            'Олег',
            'Собченко',
            'Олег Собченко',
        ],
    };
}

export default async function RootLayout(
    { children }: PropsWithChildren,
) {
    const locale = await getLocale();
    const t = await getTranslations('main');

    return <html lang={ locale } suppressHydrationWarning>
        <head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link rel="manifest" href="site.webmanifest"/>
            <meta name="theme-color" content="#000000"/>
            <link rel="manifest" href="/site.webmanifest"/>
            <link
                rel="mask-icon"
                href="/safari-pinned-tab.svg"
                color="#000000"
            />
            <meta name="msapplication-TileColor" content="#000000"/>
            <meta property="og:title" content={ t('title') }/>
            <meta property="og:description" content={ t('description') }/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://olehsobchenko.me"/>
            <meta
                property="og:image"
                content="https://olehsobchenko.me/android-chrome-512x512.png"
            />
            <meta property="og:image:alt" content="/favicon.ico"/>
        </head>
        <body
            className={
                `${ robotoCondensed.className } bg-main-background text-main-color font-bold fill-main-color overflow-x-hidden`
            }
            suppressHydrationWarning
        >
            <ThemeProvider>
                <LocaleProvider>
                    <PostsProvider>
                        { children }
                    </PostsProvider>
                </LocaleProvider>
            </ThemeProvider>
        </body>
    </html>;
}
