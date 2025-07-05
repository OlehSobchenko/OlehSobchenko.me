'use client';
import PostsFilterContainer from '@/components/posts/PostsFilterContainer';
import PostsTitle from '@/components/posts/PostsTitle';
import PostsGrid from '@/components/posts/PostsGrid';

export default function PostsContainer() {
    return <div className="p-(--page-indent)">
        <PostsFilterContainer title={ <PostsTitle/> }/>
        <PostsGrid/>
    </div>;
}
