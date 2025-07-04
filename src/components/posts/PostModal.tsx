'use client';

import React, { useEffect, useState } from 'react';
import Modal from '@/components/base/Modal';
import PostCard from '@/components/posts/PostCard';
import { Languages } from '@/i18n/config';
import PostHeaderTitle from '@/components/posts/parts/PostHeaderTitle';
import PostDate from '@/components/posts/parts/PostDate';
import PostHeaderIcon from '@/components/posts/parts/PostHeaderIcon';
import { useLocale } from 'next-intl';
import getPost from '@/utils/data/getPost';
import { Post } from '@/types';
import getIndexedEntries from '@/utils/data/getIndexedEntries';
import enrichPost from '@/utils/data/enrichPost';

export interface PostModalProps {
    id: string;
}

export default function PostModal(props: PostModalProps) {
    const locale = useLocale() as Languages;
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        (async () => {
            const [
                rawPost,
                loadedTypes = [],
                loadedCategories = [],
            ] = await Promise.all([
                getPost(String(props.id)),
                getIndexedEntries('types'),
                getIndexedEntries('categories'),
            ]);

            if (rawPost) {
                setPost(enrichPost(rawPost, loadedTypes, loadedCategories));
            }
        })();
    }, [props.id]);

    if (!post) {
        return null;
    }

    return <Modal
        open
        title={ <div
            className="flex justify-between items-center mx-main-spacing post-header-wrapper gap-4"
        >
            <PostHeaderIcon type={ post.type }/>
            <div
                className="pr-2.5 max-w-[calc(100%-32px)] md:max-w-[calc(100%-40px)]"
            >
                <PostHeaderTitle
                    category={ post.category }
                    type={ post.type }
                    lang={ locale }
                />
                <PostDate happenedAt={ post.happenedAt }/>
            </div>
        </div> }
    >
        <PostCard post={ post } lang={ locale } short={ false } fullImage/>
    </Modal>;
}
