'use client';

import React from 'react';
import PostCard from '@/components/posts/PostCard';
import { useLocale } from 'next-intl';
import { Languages } from '@/i18n/config';
import Masonry from 'react-masonry-css';
import { usePostsContext } from '@/components/providers/PostsProvider';
import useOpenLink from '@/utils/hooks/useOpenLink';
import useIntersectionObserverCallback
    from '@/utils/hooks/useIntersectionObserverCallback';
import SpinLoader from '@/components/base/SpinLoader';

function LastComponent({ loadMore }: { loadMore: () => void }) {
    const { ref } = useIntersectionObserverCallback({
        onEnter: () => loadMore(),
        triggerOnce: false,
        rootMargin: '200px',
    });

    return <div className="posts-watching-element" ref={ ref }/>;
}

export default function PostsGrid() {
    const locale = useLocale();
    const { posts, loading, loadMore } = usePostsContext();
    const openLink = useOpenLink();

    if (!posts.length && loading.posts) {
        return <div
            className="w-full h-screen flex items-center justify-center"
        >
            <SpinLoader className="w-20 h-20"/>
        </div>;
    }

    return <>
        <Masonry
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
        </Masonry>
        { loading.posts && <div
            className="w-full h-1/3 flex items-center justify-center"
        >
            <SpinLoader className="w-20 h-20"/>
        </div> }
        <LastComponent loadMore={ loadMore }/>
    </>;
};
