'use server';

import { Post } from '@/components/posts/types';
import types from '@/data/types.json';
import categories from '@/data/categories.json';
import posts from '@/data/posts.json';

export default async function getPost(id: string): Promise<Post | null> {
    const post = posts.find(post => post.path === id);

    return post ? {
        ...post,
        type: types.find(type => type.id === post.typeId),
        category: categories.find(category => category.id === post.categoryId),
    } : null;
}