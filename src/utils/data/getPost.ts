import { Post } from '@/types';
import fetchJSON from '@/utils/data/fetchJSON';
import config from '@/config';

export default async function getPost(
    id: string,
    audioId?: string,
): Promise<Post | null> {
    if (audioId) {
        const [post, audio] = await Promise.all([
            fetchJSON(config.contentUrl + `posts/${ id }.json`),
            fetchJSON(config.contentUrl + `audios/${ audioId }.json`),
        ]);

        return { ...post, audio };
    }

    const post = await fetchJSON(config.contentUrl + `posts/${ id }.json`);

    if (post?.audioId) {
        return {
            ...post,
            audio: await fetchJSON(
                config.contentUrl + `audios/${ post.audioId }.json`,
            ),
        };
    }

    return post;
}
