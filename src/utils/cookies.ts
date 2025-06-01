export const cookies = {
    get: (key: string): string | null => {
        if (typeof window === 'undefined') {
            return null;
        }

        const match = document.cookie.match(
            new RegExp(`/(^| )${ key }=([^;]+)/)`),
        );

        return match ? match[2] as string : null;
    },
    set: (key: string, value: string) => {
        if (typeof window === 'undefined') {
            return;
        }

        document.cookie =
            `${ key }=${ value }; path=/; max-age=31536000`;
    },
};
