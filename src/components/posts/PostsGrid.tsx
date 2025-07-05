import { useLocale } from 'next-intl';
import useOpenLink from '@/utils/hooks/useOpenLink';
import Masonry from 'react-masonry-css';
import PostCard from '@/components/posts/PostCard';
import { Languages } from '@/i18n/config';
import React from 'react';
import { Post } from '@/types';

export interface PostsGridProps {
    posts: Post[];
}

export default function PostsGrid(props: PostsGridProps) {
    const locale = useLocale();
    const openLink = useOpenLink();

    return <Masonry
        breakpointCols={ {
            default: 2,
            1024: 1,
        } }
        className="flex"
        columnClassName="posts-column bg-clip-padding ml-16 mr-16 first:ml-0 last:mr-0 lg:first:last:pr-16"
    >
        { props.posts.map(post => <PostCard
            key={ post.id }
            post={ post }
            lang={ locale as Languages }
            short
            onOpenFull={ openLink(`/post/${ post.id }`) }
        />) }
    </Masonry>;
}
