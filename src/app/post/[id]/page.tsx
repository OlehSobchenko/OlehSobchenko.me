import Modal from '@/components/base/Modal';
import redirectTo from '@/actions/redirectTo';
import { useParams } from 'next/navigation';
import posts from '@/data/posts.json';
import categories from '@/data/categories.json';
import types from '@/data/types.json';
import PostCard from '@/components/posts/PostCard';
import { useLocale } from 'use-intl';
import { Languages } from '@/i18n/config';
import PostHeaderTitle from '@/components/posts/parts/PostHeaderTitle';
import PostDate from '@/components/posts/parts/PostDate';
import PostHeaderIcon from '@/components/posts/parts/PostHeaderIcon';
import React from 'react';
import { Post } from '@/components/posts/types';

export function generateStaticParams() {
  return posts.map(post => ({ id: post.path || post.id }));
}

    'use client';

export default function Page() {
    const { id } = useParams<{ id?: string; }>();
    const post = posts.find(post => post.path === id);
    const fullPost: Post | null = post ? {
        ...post,
        type: types.find(type => type.id === post.typeId),
        category: categories.find(category => category.id === post.categoryId),
    } : null;
    const locale = useLocale() as Languages;

    if (!fullPost) {
        return null;
    }

    return <Modal
        open
        title={ <div
            className="flex justify-between items-center mx-main-spacing post-header-wrapper gap-4"
        >
            <PostHeaderIcon type={ fullPost.type }/>
            <div
                className="pr-2.5 max-w-[calc(100%-32px)] md:max-w-[calc(100%-40px)]"
            >
                <PostHeaderTitle
                    category={ fullPost.category }
                    type={ fullPost.type }
                    lang={ locale }
                />
                <PostDate happenedAt={ fullPost.happenedAt }/>
            </div>
        </div> }
        onClose={ () => redirectTo('/') }
    >
        <PostCard post={ fullPost } lang={ locale } short={ false } fullImage/>
    </Modal>;
}

