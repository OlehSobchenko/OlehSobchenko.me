'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Languages, defaultLocale } from '@/i18n/config';
import { NextIntlClientProvider } from 'next-intl';
import en from '@/messages/en.json';
import uk from '@/messages/uk.json';
import { LOCALE_COOKIE_NAME } from '@/i18n/store';

type LocaleContextType = {
    locale: Languages;
    setLocale: (locale: Languages) => void;
};

const LocaleContext = createContext<LocaleContextType>({
    locale: defaultLocale,
    setLocale: () => {},
});

const defineBrowserLanguage = (
    locales: string[] | readonly string[],
): Languages | undefined => {
    const langCodes = locales.map(locale => locale.split('-')[0]);

    return langCodes.find(c => locales.includes(c)) as Languages | undefined;
};

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
    const [locale, setLocaleState] = useState<Languages>(defaultLocale);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedLocale = document.cookie
            .split('; ')
            .find(row => row.startsWith(`${ LOCALE_COOKIE_NAME }=`))
            ?.split('=')[1] as Languages;
        const browserLocale = defineBrowserLanguage(navigator.languages);

        if (savedLocale) {
            setLocaleState(savedLocale);
        }

        if (!savedLocale && browserLocale) {
            setLocaleState(browserLocale);
        }

        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const setLocale = (newLocale: Languages) => {
        document.cookie =
            `${ LOCALE_COOKIE_NAME }=${ newLocale };path=/;max-age=31536000`;
        setLocaleState(newLocale);
    };
    const messages = { en, uk };

    return <LocaleContext.Provider value={{ locale, setLocale }}>
        <NextIntlClientProvider
            locale={ locale }
            messages={ messages[locale] }
            timeZone={ 'Europe/Kiev' }
        >
            { children }
        </NextIntlClientProvider>
    </LocaleContext.Provider>;
};

export const useLocaleContext = () => useContext(LocaleContext);
