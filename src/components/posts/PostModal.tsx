'use client';

import React, { useEffect, useState } from 'react';
import Modal from '@/components/base/Modal';
import PostCard from '@/components/posts/PostCard';
import PostHeaderTitle from '@/components/posts/parts/PostHeaderTitle';
import PostDate from '@/components/posts/parts/PostDate';
import PostHeaderIcon from '@/components/posts/parts/PostHeaderIcon';
import { useTranslations } from 'next-intl';
import getPost from '@/utils/data/getPost';
import { Post } from '@/types';
import getIndexedEntries from '@/utils/data/getIndexedEntries';
import enrichPost from '@/utils/data/enrichPost';
import useOpenLink from '@/utils/hooks/useOpenLink';
import useLocale from '@/utils/hooks/useLocale';
import isPWA from '@/utils/isPWA';
import { useRouter } from 'next/navigation';

export interface PostModalProps {
    id: string;
}

export default function PostModal(props: PostModalProps) {
    const locale = useLocale();
    const [post, setPost] = useState<Post | null>(null);
    const openLink = useOpenLink();
    const router = useRouter();
    const t = useTranslations('PostCard');

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
            className="flex justify-between items-center mx-main-spacing post-header-wrapper gap-4 min-w-0"
        >
            <PostHeaderIcon type={ post.type }/>
            <div className="min-w-0 flex-1">
                <PostHeaderTitle
                    category={ post.category }
                    type={ post.type }
                    lang={ locale }
                />
                <PostDate happenedAt={ post.happenedAt }/>
            </div>
        </div> }
        onClose={ isPWA() ? router.back : undefined }
    >
        <PostCard
            id={ post.id }
            post={ post }
            locale={ locale }
            openLink={ openLink }
            titles={{
                link: t('link'),
                openFull: t('openFull'),
            }}
        />
    </Modal>;
}
