'use client';

import React from 'react';
import PostCard from '@/components/posts/PostCard';
import { useLocale } from 'next-intl';
import { Languages } from '@/i18n/config';
import Masonry from 'react-masonry-css';
import { usePostsContext } from '@/components/providers/PostsProvider';
import useOpenLink from '@/utils/hooks/useOpenLink';

export default function PostsGrid() {
    const locale = useLocale();
    const { posts } = usePostsContext();
    const openLink = useOpenLink();

    return <Masonry
        breakpointCols={ {
            default: 2,
            1024: 1,
        } }
        className="flex"
        columnClassName="posts-column bg-clip-padding ml-16 mr-16 first:ml-0 last:mr-0 lg:first:last:pr-16"
    >
        { posts.map(post => <PostCard
            key={ post.id }
            post={ post }
            lang={ locale as Languages }
            short
            onOpenFull={ openLink(`/post/${ post.id }`) }
        />) }
    </Masonry>;
};
