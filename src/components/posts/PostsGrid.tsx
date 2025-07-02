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
    const { posts, loading } = usePostsContext();
    const openLink = useOpenLink();

    if (loading.posts) {
        return <div
            className="w-full h-screen flex items-center justify-center"
        >
            <div
                className="w-20 h-20 border-6 border-(--bg-color) border-t-(--main-color) rounded-full animate-spin"
            />
        </div>;
    }

    if (!posts.length) {
        return <div
            className="w-full h-screen flex items-center justify-center"
        >
            <div>
                <svg
                    className="w-20 h-20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                >
                    <path
                        d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"
                    />
                </svg>
            </div>
        </div>;
    }

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
