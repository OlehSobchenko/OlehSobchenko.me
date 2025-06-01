'use client';

import React from 'react';
import PostCard from '@/components/posts/PostCard';
import posts from '@/data/posts.json';
import types from '@/data/types.json';
import categories from '@/data/categories.json';
import { useLocale } from 'next-intl';
import { Languages } from '@/i18n/config';
import openInNewTab from '@/utils/openInNewTab';
import Masonry from 'react-masonry-css';

export default function PostsGrid() {
    const locale = useLocale();
    const fullPosts = posts.map(post => ({
        ...post,
        type: types.find(type => type.id === post.typeId),
        category: categories.find(category => category.id === post.categoryId),
    }));

    return <Masonry
        breakpointCols={ {
            default: 2,
            1024: 1,
        } }
        className="flex gap-32"
        columnClassName="posts-column bg-clip-padding"
    >
        { fullPosts.map(post => <PostCard
            key={ post.id }
            post={ post }
            lang={ locale as Languages }
            short
            onOpenFull={ () => openInNewTab('/post/' + post.path || post.id) }
        />) }
    </Masonry>;
};
