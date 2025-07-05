export default async function fetchArrayBuffer(
    url: string,
): Promise<ArrayBuffer | null> {
    const response = await fetch(url, {
        cache: 'no-cache',
        credentials: 'omit',
    });

    return response.ok ? await response.arrayBuffer() : null;
};
