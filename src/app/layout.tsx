import 'react-datepicker/dist/react-datepicker.css';
import '@/app/globals.css';
import '@/styles/datepicker.css';
import type { Metadata } from 'next';
import { Roboto_Condensed } from 'next/font/google';
import { PropsWithChildren } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import { LocaleProvider } from '@/components/providers/LocaleProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import config from '@/config';

const robotoCondensed = Roboto_Condensed({
    subsets: ['latin', 'cyrillic'],
    variable: '--font-roboto-condensed',
    display: 'swap',
});

const getPersonInfo = (
    translations: Awaited<ReturnType<typeof getTranslations>>,
) => {
    return {
        title: translations('firstName') + ' ' + translations('lastName'),
        description: translations('quote').replace(/[\t\r\n]/g, ''),
    };
};

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations('PersonInfo');
    const personInfo = getPersonInfo(t);

    return {
        title: personInfo.title,
        description: personInfo.description,
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
        applicationName: personInfo.title,
        keywords: [
            'Oleh',
            'Sobchenko',
            'Oleh Sobchenko',
            'Олег',
            'Собченко',
            'Олег Собченко',
        ],
        openGraph: {
            type: 'website',
            url: config.baseUrl,
            title: personInfo.title,
            description: personInfo.description,
            siteName: personInfo.title,
            images: [
                {
                    url: `${ config.baseUrl }/android-chrome-512x512.png`,
                },
                {
                    url: `${ config.baseUrl }/main-photo.svg`,
                },
            ],
        },
    };
}

const themeFollowerScript = `(function () {
    const theme = localStorage.getItem('${ config.storageKeys.theme }')
        || (
            window.matchMedia(
                '(prefers-color-scheme: dark)',
            ).matches ? 'dark' : 'light'
        );
    const color = theme === 'dark' ? '#000000' : '#FFFFFF';

    document.querySelector(
        'meta[name="theme-color"]',
    )?.setAttribute('content', color);
    document.querySelector(
        'meta[name="msapplication-navbutton-color"]',
    )?.setAttribute('content', color);
    document.querySelector(
        'meta[name="apple-mobile-web-app-status-bar-style"]',
    )?.setAttribute(
        'content',
        theme === 'dark' ? 'black-translucent' : 'default',
    );
    document.querySelector(
        'meta[name="mobile-web-app-status-bar-style"]',
    )?.setAttribute(
        'content',
        theme === 'dark' ? 'black-translucent' : 'default',
    );
    document.querySelector('link[rel="mask-icon"]')?.setAttribute(
        'color',
        color,
    );
})();`;

export default async function RootLayout(
    { children }: PropsWithChildren,
) {
    const locale = await getLocale();
    const t = await getTranslations('PersonInfo');
    const personInfo = getPersonInfo(t);

    return <html lang={ locale } suppressHydrationWarning>
        <head>
            <title>{ personInfo.title }</title>

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta property="og:title" content={ personInfo.title }/>
            <meta
                property="og:description"
                content={ personInfo.description }
            />
            <meta property="og:url" content={ config.baseUrl }/>
            <meta property="og:site_name" content={ personInfo.title }/>
            <meta
                property="og:image"
                content={ `${ config.baseUrl }/android-chrome-512x512.png` }
            />
            <meta property="og:type" content="website"/>

            <meta name="theme-color" content="#000000"/>
            <meta name="mobile-web-app-capable" content="yes"/>
            <meta name="mobile-web-app-status-bar-style" content="default"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
            <meta name="msapplication-navbutton-color" content="#000000"/>

            <link rel="manifest" href="/site.webmanifest"/>
            <link
                rel="mask-icon"
                href="/safari-pinned-tab.svg"
                color="#000000"
            />

            <script
                dangerouslySetInnerHTML={ { __html: themeFollowerScript } }
            />
            <script
                defer
                src="https://static.cloudflareinsights.com/beacon.min.js"
                data-cf-beacon='{"token": "f10bbbf0803f43b1aef10c9040c79ac6"}'
            />
        </head>
        <body
            className={
                `${ robotoCondensed.className } bg-main-background text-main-color font-bold fill-main-color overflow-x-hidden`
            }
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
