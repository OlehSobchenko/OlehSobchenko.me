'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';
import { useEffect } from 'react';

export default function ThemeProvider(
    { children, ...props }: ThemeProviderProps,
) {
    useEffect(() => {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;

            document.documentElement.style.setProperty('--vh', `${ vh }px`);
        };

        setVH();
        window.addEventListener('resize', setVH);

        return () => {
            return window.removeEventListener('resize', setVH);
        };
    }, []);

    return <NextThemesProvider
        { ...props }
        attribute="class"
        enableColorScheme
        disableTransitionOnChange
    >
        { children }
    </NextThemesProvider>;
}
