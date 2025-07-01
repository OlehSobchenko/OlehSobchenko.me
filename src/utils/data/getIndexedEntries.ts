import fetchJSON from '@/utils/data/fetchJSON';
import config from '@/config';

export default function getIndexedEntries<T = any>(
    entity: string,
): Promise<T | null> {
    return fetchJSON<T>(config.contentUrl + `${ entity }_index.json`);
};
