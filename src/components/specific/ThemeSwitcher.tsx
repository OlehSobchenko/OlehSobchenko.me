'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme: theme } = useTheme();

    const handleSwitchThemes = () => {
        setTheme(theme => {
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
                theme === 'dark' ? 'default' : 'black',
            );
            document.querySelector(
                'meta[name="mobile-web-app-status-bar-style"]',
            )?.setAttribute(
                'content',
                theme === 'dark' ? 'default' : 'black',
            );
            document.querySelector('link[rel="mask-icon"]')?.setAttribute(
                'color',
                color,
            );

            return theme === 'light' ? 'dark' : 'light';
        });
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return <div
        className="cursor-pointer lg:p-2 p-1"
        onClick={ handleSwitchThemes }
    >
        { theme === 'light' && <svg
            className="sm:w-8 sm:h-8 w-[29pxx] h-[29px] light-theme-icon"
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
        >
            <path
                d="M480.07-359.78q50.02 0 85.36-35.25 35.35-35.25 35.35-85.04 0-50.02-35.41-85.36-35.42-35.35-85.44-35.35-50.02 0-85.08 35.41-35.07 35.42-35.07 85.44 0 50.02 35.25 85.08 35.25 35.07 85.04 35.07ZM480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM209.61-440.39H30.39v-79.22h179.22v79.22Zm720 0H750.39v-79.22h179.22v79.22Zm-489.22-310v-179.22h79.22v179.22h-79.22Zm0 720v-179.22h79.22v179.22h-79.22ZM261.43-643.87l-113-110.56 56-58.14 110.7 112.44-53.7 56.26Zm495.14 495.44-112.7-113L699-316.57l112.57 110.44-55 57.7ZM643.43-699l111-112.57 58.14 55-111.44 112.7-57.7-55.13Zm-495 494.57 112-112.7L316.57-261 206.13-148.43l-57.7-56ZM480-480Z"/>
        </svg> }
        { theme === 'dark' && <svg
            className="sm:w-8 sm:h-8 w-7 h-7 dark-theme-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
        >
            <path
                d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q10 0 20.5.67 10.5.66 24.17 2-37.67 31-59.17 77.83T444-660q0 90 63 153t153 63q53 0 99.67-20.5 46.66-20.5 77.66-56.17 1.34 12.34 2 21.84.67 9.5.67 18.83 0 150-105 255T480-120Zm0-66.67q102 0 179.33-61.16Q736.67-309 760.67-395.67q-23.34 9-49.11 13.67-25.78 4.67-51.56 4.67-117.46 0-200.06-82.61-82.61-82.6-82.61-200.06 0-22.67 4.34-47.67 4.33-25 14.66-55-91.33 28.67-150.5 107-59.16 78.34-59.16 175.67 0 122 85.66 207.67Q358-186.67 480-186.67Zm-6-288Z"/>
        </svg> }
    </div>;
}
