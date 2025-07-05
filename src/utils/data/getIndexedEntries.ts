import fetchJSON from '@/utils/data/fetchJSON';
import config from '@/config';
import fetchCompressedJSON from '@/utils/data/fetchCompressedJSON';

export default function getIndexedEntries<T = any>(
    entity: string,
    compressed?: boolean,
): Promise<T | null> {
    if (compressed) {
        return fetchCompressedJSON<T>(config.contentUrl + `${ entity }_index.gz`);
    }

    return fetchJSON<T>(config.contentUrl + `${ entity }_index.json`);
};
