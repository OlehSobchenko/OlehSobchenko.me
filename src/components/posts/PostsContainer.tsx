'use server';

import PostsGrid from '@/components/posts/PostsGrid';
import { getTranslations } from 'next-intl/server';

export default async function PostsContainer() {
    const t = await getTranslations('PostsContainer');

    return <div className="lg:p-16 p-8 max-w-[1920px]">
        <div className="lg:text-8xl text-6xl uppercase lg:pb-16 pb-8">
            { t('title') }
        </div>
        <PostsGrid/>
    </div>;
}
