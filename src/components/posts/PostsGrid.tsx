'use client';

import React from 'react';
import PostCard from '@/components/posts/PostCard';
import { useLocale } from 'next-intl';
import { Languages } from '@/i18n/config';
import openInNewTab from '@/utils/openInNewTab';
import Masonry from 'react-masonry-css';
import { usePostsContext } from '@/components/providers/PostsProvider';

export default function PostsGrid() {
    const locale = useLocale();
    const { posts } = usePostsContext();

    return <Masonry
        breakpointCols={ {
            default: 2,
            1024: 1,
        } }
        className="flex gap-32"
        columnClassName="posts-column bg-clip-padding"
    >
        { posts.map(post => <PostCard
            key={ post.id }
            post={ post }
            lang={ locale as Languages }
            short
            onOpenFull={ () => openInNewTab('/post/' + post.path || post.id) }
        />) }
    </Masonry>;
};
