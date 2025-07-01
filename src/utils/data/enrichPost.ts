import { Category, Post, Type } from '@/types';
import isAbsolutePath from '@/utils/isAbsolutePath';
import config from '@/config';

const normalizeUrl = (input?: string): string | undefined => {
    return input
        ? isAbsolutePath(input)
            ? input
            : `${ config.dataBaseUrl }${ input }`
        : input;
};

export default function enrichPost(
    post: Post,
    types: Category[],
    categories: Type[],
): Post {
    return {
        ...post,
        link: normalizeUrl(post.link),
        audio: normalizeUrl(post.audio),
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
