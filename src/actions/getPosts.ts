'use server';

import posts from '@/data/posts.json';
import { Post } from '@/components/posts/types';
import types from '@/data/types.json';
import categories from '@/data/categories.json';

export default async function getPosts(): Promise<Post[]> {
    return posts.map(post => ({
        ...post,
        type: types.find(type => type.id === post.typeId),
        category: categories.find(category => category.id === post.categoryId),
    }));
}
