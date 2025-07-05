import { useTranslations } from 'next-intl';

export default function PostsTitle() {
    const t = useTranslations('PostsTitle');

    return <div
        title={ t('title') }
        className="posts-header-title lg:text-8xl text-5xl overflow-hidden text-ellipsis whitespace-nowrap"
    >
        { t('title') }
    </div>;
}