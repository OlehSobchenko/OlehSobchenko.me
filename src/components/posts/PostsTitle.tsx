import { useTranslations } from 'next-intl';

export default function PostsTitle() {
    const t = useTranslations('PostsContainer');

    return <div className="lg:text-8xl text-6xl">{ t('title') }</div>;
}
