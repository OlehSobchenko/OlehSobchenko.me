'use client';

import { useEffect } from 'react';

export default function CloudflareBeacon() {
    useEffect(() => {
        const existing = document.querySelector(
            'script[src="https://static.cloudflareinsights.com/beacon.min.js"]',
        ) as HTMLScriptElement | null;

        if (existing) {
            return;
        }

        const script = document.createElement('script');

        script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
        script.defer = true;
        script.setAttribute(
            'data-cf-beacon',
            '{"token": "f10bbbf0803f43b1aef10c9040c79ac6"}',
        );

        document.head.appendChild(script);

        return () => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return null;
}
