'use client';

import React from 'react';
import { usePostsContext } from '@/components/providers/PostsProvider';
import useIntersectionObserverCallback
    from '@/utils/hooks/useIntersectionObserverCallback';
import SpinLoader from '@/components/base/SpinLoader';
import PostsGrid from '@/components/posts/PostsGrid';

function LastComponent({ loadMore }: { loadMore: () => void }) {
    const { ref } = useIntersectionObserverCallback({
        onEnter: () => loadMore(),
        triggerOnce: false,
        rootMargin: '200px',
    });

    return <div className="posts-watching-element" ref={ ref }/>;
}

export default function PostsFeed() {
    const { posts, loading, loadMore } = usePostsContext();

    if (!posts.length && loading.posts) {
        return <div
            className="w-full h-screen flex items-center justify-center"
        >
            <SpinLoader className="w-20 h-20"/>
        </div>;
    }

    return <div>
        <PostsGrid posts={ posts }/>
        { loading.posts && <div
            className="w-full h-1/3 flex items-center justify-center"
        >
            <SpinLoader className="w-20 h-20"/>
        </div> }
        <LastComponent loadMore={ loadMore }/>
    </div>;
};
