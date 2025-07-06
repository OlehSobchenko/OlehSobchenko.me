import fetchArrayBuffer from '@/utils/data/fetchArrayBuffer';
import Compression from '@/utils/compression';
import parseJSON from '@/utils/pasreJSON';

export default async function fetchCompressedJSON<T = any>(
    url: string,
): Promise<T | null> {
    const result = await fetchArrayBuffer(url);

    if (!result) {
        return null;
    }

    return parseJSON(await Compression.decompress(result), null);
}
