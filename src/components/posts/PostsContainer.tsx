'use client';
import PostsFilterContainer from '@/components/posts/PostsFilterContainer';
import PostsTitle from '@/components/posts/PostsTitle';
import PostsGrid from '@/components/posts/PostsGrid';

export default function PostsContainer() {
    return <div className="lg:p-16 p-8">
        <PostsFilterContainer title={ <PostsTitle/> }/>
        <PostsGrid/>
    </div>;
}
