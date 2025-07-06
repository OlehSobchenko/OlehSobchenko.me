'use client';

import useOpen from '@/utils/hooks/useOpen';
import Modal from '@/components/base/Modal';
import { useTranslations } from 'next-intl';
import React, {
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import config from '@/config';
import Search from '@/utils/search';
import fetchCompressedJSON from '@/utils/data/fetchCompressedJSON';
import { usePostsContext } from '@/components/providers/PostsProvider';
import PostsGrid from '@/components/posts/PostsGrid';
import { Post } from '@/types';
import SpinLoader from '@/components/base/SpinLoader';
import getPost from '@/utils/data/getPost';
import enrichPost from '@/utils/data/enrichPost';
import debounce from '@/utils/debounce';
import useLocale from '@/utils/hooks/useLocale';

interface SearchUtils {
    search: (query: string) => string[];
    loading: boolean;
}

function useSearch(load?: boolean): SearchUtils {
    const locale = useLocale();
    const searchEngine = useRef<Search | null>(null);
    const [loading, setLoading] = useState(false);
    const shouldLoad = load !== false;

    const initializeSearch = useCallback(() => {
        setLoading(true);

        fetchCompressedJSON(config.contentUrl + `posts_search_${ locale }.gz`)
            .then(index => {
                searchEngine.current = new Search({ index });
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [locale]);

    useEffect(() => {
        if (shouldLoad && searchEngine.current === null) {
            initializeSearch();
        }
    }, [shouldLoad, initializeSearch]);

    useEffect(() => {
        if (shouldLoad) {
            initializeSearch();

            return;
        }

        searchEngine.current = null;
    }, [locale, initializeSearch]);

    const search = useCallback((query: string): string[] => {
        if (!searchEngine.current || !query || query.length < 2) {
            return [];
        }

        return searchEngine.current.search(query);
    }, []);

    return { search, loading };
}

interface PostsSearchResultProps {
    ids: string[];
    nothingFound?: ReactNode;
}

function useSearchedPosts(ids: string[]) {
    const { types, categories } = usePostsContext();
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        setLoading(true);
        setPosts([]);

        (async () => {
            try {
                for await (const postId of ids) {
                    const post = await getPost(postId);

                    if (post) {
                        setPosts(previous => {
                            setLoading(false);

                            if (previous.find(p => p.id === post.id)) {
                                return previous;
                            }

                            return [
                                ...previous,
                                enrichPost(post, types, categories),
                            ];
                        });
                    }
                }
            } catch { /* empty */ }

            setLoading(false);
        })();
    }, [ids, types, categories]);

    return { loading, posts };
}

function PostsSearchResult({ nothingFound, ids }: PostsSearchResultProps) {
    const { loading, posts } = useSearchedPosts(ids);

    if (!ids.length) {
        return nothingFound;
    }

    if (loading) {
        return <div
            className="fixed w-full h-screen flex items-center justify-center top-0 left-0"
        >
            <SpinLoader className="w-20 h-20"/>
        </div>;
    }

    return <div className="pt-8">
        <PostsGrid posts={ posts } variant={ 'modal' }/>
    </div>;
}

export default function PostsSearch() {
    const { open, close, opened } = useOpen();
    const t = useTranslations('PostsSearch');
    const [query, setQuery] = useState('');
    const { search } = useSearch(opened);

    useEffect(() => {
        if (!opened) {
            setQuery('');
        }
    }, [opened]);

    const debouncedSearch = useCallback(debounce(setQuery), []);

    const handleInputChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            debouncedSearch(event.target.value);
        },
        [debouncedSearch],
    );

    const showResults = query.length >= config.postsSearch.minQueryLength;

    return <>
        <div
            className="cursor-pointer lg:p-2 p-0.5"
            onClick={ open }
        >
            <svg
                className="sm:w-8 sm:h-8 w-[29px] h-[29px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
            >
                <path
                    d="M795.43-105.17 529.04-371q-29.43 24.26-69.11 37.94-39.67 13.67-85.32 13.67-112.12 0-189.87-77.83Q107-475.04 107-585q0-109.96 77.83-187.78 77.82-77.83 188.28-77.83 110.46 0 187.78 77.83 77.33 77.82 77.33 187.93 0 43.98-13.15 83.13-13.16 39.15-39.46 73.59L853-162.74l-57.57 57.57ZM373.81-398.61q77.66 0 131.42-54.53Q559-507.67 559-585q0-77.33-53.85-131.86-53.85-54.53-131.34-54.53-78.33 0-132.96 54.53-54.63 54.53-54.63 131.86 0 77.33 54.55 131.86 54.55 54.53 133.04 54.53Z"
                />
            </svg>
        </div>
        <Modal
            open={ opened }
            onClose={ close }
            title={ <input
                id="posts-search-input"
                autoFocus
                className="min-w-0 bg-transparent border-0 h-10 font-bold text-4xl focus:outline-hidden placeholder:font-bold placeholder:text-4xl placeholder:opacity-50"
                type="text"
                placeholder={ t('search') }
                onChange={ handleInputChange }
            /> }
        >
            { showResults && <PostsSearchResult
                ids={ search(query).slice(0, config.postsSearch.resultItems) }
                nothingFound={ <div
                    className="text-4xl text-neutral-500 pt-4"
                >
                    { t('nothingFound') }
                </div> }
            /> }
        </Modal>
    </>;
}
