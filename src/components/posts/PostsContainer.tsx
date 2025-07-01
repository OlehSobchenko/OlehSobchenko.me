'use client';
import PostsFilter from '@/components/posts/PostsFilter';
import PostsTitle from '@/components/posts/PostsTitle';
import PostsGrid from '@/components/posts/PostsGrid';

export default function PostsContainer() {
    return <div className="lg:p-16 p-8">
        <PostsFilter title={ <PostsTitle/> }/>
        <PostsGrid/>
    </div>;
}
