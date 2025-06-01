'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Languages, defaultLocale } from '@/i18n/config';
import { NextIntlClientProvider } from 'next-intl';
import en from '@/messages/en.json';
import uk from '@/messages/uk.json';

type LocaleContextType = {
    locale: Languages;
    setLocale: (locale: Languages) => void;
};

const LocaleContext = createContext<LocaleContextType>({
    locale: defaultLocale,
    setLocale: () => {},
});

export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
    const [locale, setLocaleState] = useState<Languages>(defaultLocale);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedLocale = document.cookie
            .split('; ')
            .find(row => row.startsWith('NEXT_LOCALE='))
            ?.split('=')[1] as Languages;

        if (savedLocale) {
            setLocaleState(savedLocale);
        }

        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const setLocale = (newLocale: Languages) => {
        document.cookie = `NEXT_LOCALE=${ newLocale };path=/;max-age=31536000`;
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
