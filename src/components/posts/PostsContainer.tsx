'use client';

import PostsFilterContainer from '@/components/posts/PostsFilterContainer';
import PostsTitle from '@/components/posts/PostsTitle';
import PostsFeed from '@/components/posts/PostsFeed';

export default function PostsContainer() {
    return <div className="p-(--page-indent)">
        <PostsFilterContainer title={ <PostsTitle/> }/>
        <PostsFeed/>
    </div>;
}
