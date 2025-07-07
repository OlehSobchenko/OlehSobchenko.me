import { useTranslations } from 'next-intl';
import useOpenLink from '@/utils/hooks/useOpenLink';
import MasonryCss from 'react-masonry-css';
import PostCard from '@/components/posts/PostCard';
import { Languages } from '@/i18n/config';
import React, { useEffect, useRef } from 'react';
import { Post } from '@/types';
import useLocale from '@/utils/hooks/useLocale';
import { Masonry } from 'masonic';
import { useMediaQuery } from '@/utils/hooks/useMediaQuery';

export interface PostsGridProps {
    posts: Post[];
    variant?: 'default' | 'modal';
}

export default function PostsGrid(props: PostsGridProps) {
    const { posts, variant = 'default' } = props;
    const locale = useLocale();
    const openLink = useOpenLink();
    const t = useTranslations('PostCard');
    const full = useMediaQuery('(min-width: 1024px)');
    const columnsCount = full ? 2 : 1;
    const containerRef = useRef<HTMLDivElement | null>(null);

    const postsDisplayedLength =
        containerRef.current?.firstChild?.childNodes?.length || 0;

    useEffect(() => {
        if (columnsCount === 1) {
            return;
        }

        const postElements = containerRef.current?.firstChild?.childNodes;

        if (!postElements?.length) {
            return;
        }

        const firstColumn: { element: HTMLDivElement; top: number }[] = [];
        const secondColumn: { element: HTMLDivElement; top: number }[] = [];

        for (const postElement of postElements as NodeListOf<HTMLDivElement>) {
            const left = (
                postElement.computedStyleMap().get('left') as any
            ).value;

            if (left === 0) {
                firstColumn.push({
                    top: (
                        postElement.computedStyleMap().get('top') as any
                    ).value,
                    element: postElement?.firstChild as HTMLDivElement,
                });

                continue;
            }

            secondColumn.push({
                top: (postElement.computedStyleMap().get('top') as any).value,
                element: postElement?.firstChild as HTMLDivElement,
            });
        }

        const [
            firstLastElement,
        ] = firstColumn.toSorted((a, b) => b.top - a.top);
        const [
            secondLastElement,
        ] = secondColumn.toSorted((a, b) => b.top - a.top);

        const [firstEl] = (firstLastElement?.element?.getElementsByClassName(
            'post-divider',
        ) || []) as unknown as HTMLDivElement[];
        const [secondEl] = (secondLastElement?.element?.getElementsByClassName(
            'post-divider',
        ) || []) as unknown as HTMLDivElement[];

        if (firstEl) {
            firstEl.style.display = 'none';
        }

        if (secondEl) {
            secondEl.style.display = 'none';
        }
    }, [postsDisplayedLength, columnsCount]);

    if (variant === 'modal' || columnsCount === 1) {
        const getColumnClassName = () => {
            if (variant === 'modal') {
                return 'posts-column bg-clip-padding ml-8 mr-8 first:ml-0 '
                    + 'last:mr-0';
            }

            return 'posts-column bg-clip-padding ml-16 mr-16 first:ml-0 last:mr-0 '
                + 'lg:first:last:pr-16';
        };

        return <MasonryCss
            breakpointCols={ {
                default: 2,
                1024: 1,
            } }
            className="flex"
            columnClassName={ getColumnClassName() }
        >
            { posts.map(post => <PostCard
                key={ post.id }
                id={ post.id }
                post={ post }
                locale={ locale as Languages }
                short
                openLink={ openLink }
                titles={{
                    link: t('link'),
                    openFull: t('openFull'),
                }}
            />) }
        </MasonryCss>;
    }

    return <div ref={ containerRef }>
        <Masonry
            className="overflow-y-hidden"
            items={ posts }
            columnCount={ columnsCount }
            columnGutter={ 128 }
            role={ 'list' }
            rowGutter={ 0 }
            itemKey={ post => post.id }
            scrollFps={ 60 }
            overscanBy={ 30 }
            render={ ({ data: post, index }) => <PostCard
                key={ post.id }
                id={ post.id }
                post={ post }
                locale={ locale as Languages }
                short
                openLink={ openLink }
                titles={{
                    link: t('link'),
                    openFull: t('openFull'),
                }}
                hideDivider={ index === posts.length - 1 }
            /> }
        />
    </div>;
}
