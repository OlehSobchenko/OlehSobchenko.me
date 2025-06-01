'use client';
import PostsGrid from '@/components/posts/PostsGrid';
import { useTranslations } from 'next-intl';

export default function PostsContainer() {
    const t = useTranslations('PostsContainer');

    return <div className="lg:p-16 p-8 max-w-[1920px]">
        <div className="lg:text-8xl text-6xl uppercase lg:pb-16 pb-8">
            { t('title') }
        </div>
        <PostsGrid/>
    </div>;
}
