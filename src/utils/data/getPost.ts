import { Post } from '@/types';
import fetchJSON from '@/utils/data/fetchJSON';
import config from '@/config';

export default async function getPost(id: string): Promise<Post | null> {
    return fetchJSON(config.contentUrl + `posts/${ id }.json`);
}
