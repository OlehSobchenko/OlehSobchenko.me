export default async function fetchJSON<T = any>(
    url: string,
): Promise<T | null> {
    const response = await fetch(url, {
        cache: 'no-cache',
        credentials: 'omit',
    });

    return response.ok ? await response.json() : null;
};
