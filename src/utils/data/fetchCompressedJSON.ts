import fetchArrayBuffer from '@/utils/data/fetchArrayBuffer';
import Compression from '@/utils/compression';

export default async function fetchCompressedJSON<T = any>(
    url: string,
): Promise<T | null> {
    const result = await fetchArrayBuffer(url);

    if (!result) {
        return null;
    }

    return JSON.parse(await Compression.decompress(result));
}
