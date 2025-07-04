import { Category, Post, Type } from '@/types';
import normalizeUrl from '@/utils/data/normalizeUrl';
import enrichAudio from '@/utils/data/enrichAudio';

export default function enrichPost(
    post: Post,
    types: Category[],
    categories: Type[],
): Post {
    return {
        ...post,
        link: normalizeUrl(post.link),
        audio: enrichAudio(post.audio),
        image: normalizeUrl(post.image),
        video: post.video
            ? {
                ...post.video,
                link: normalizeUrl(post.video.link),
            }
            : post.video
        ,
        type: types.find(type => type.id === post.typeId),
        category: categories.find(category => category.id === post.categoryId),
    };
};
