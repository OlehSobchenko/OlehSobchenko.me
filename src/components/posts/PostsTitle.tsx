import { useTranslations } from 'next-intl';

export default function PostsTitle() {
    const t = useTranslations('PostsTitle');

    return <div className="lg:text-8xl text-5xl">{ t('title') }</div>;
}
