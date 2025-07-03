'use client';

import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { Category, Post, PostIndex, Type } from '@/types';
import config from '@/config';
import getPost from '@/utils/data/getPost';
import enrichPost from '@/utils/data/enrichPost';
import usePostsBase from '@/utils/hooks/domain/usePostsBase';

export interface FilterOptions {
    categories: string[];
    types: string[];
    dates: [Date | null, Date | null];
}

export interface PostsFilterUtils {
    options: FilterOptions;
    set: Dispatch<SetStateAction<FilterOptions>>;
    empty: boolean;
    clear: () => void;
}

export interface PostsContextType {
    posts: Post[];
    categories: Category[];
    types: Type[];
    loading: {
        base: boolean;
        posts: boolean;
    };
    loadMore: () => void;
    filter: PostsFilterUtils;
}

const applyDatesFilter = (
    post: Post,
    dates: [Date | null, Date | null],
): boolean => {
    const [start, end] = dates;

    if (!start && !end) {
        return true;
    }

    const happenedAt = new Date(post.happenedAt);
    const time = happenedAt.getTime();

    if (start && start.getTime() > time) {
        return false;
    }

    return !(end && end.getTime() < time);
};

const isEmptyFilter = (filterOptions: FilterOptions): boolean => {
    if (filterOptions.dates.some(date => date !== null)) {
        return false;
    }

    if (filterOptions.types.length > 0) {
        return false;
    }

    return filterOptions.categories.length <= 0;
};

const filterPostsIndex = (
    filterOptions: FilterOptions,
    posts: PostIndex[],
): PostIndex[] => {
    if (isEmptyFilter(filterOptions)) {
        return posts;
    }

    const hasTypeFilter = filterOptions.types.length > 0;
    const hasCategoryFilter = filterOptions.categories.length > 0;
    const hasDateFilter = filterOptions.dates.some(date => date !== null);

    return posts.filter(post => {
        if (hasDateFilter) {
            if (!applyDatesFilter(post, filterOptions.dates)) {
                return false;
            }
        }

        if (hasTypeFilter || hasCategoryFilter) {
            const typeMatches = hasTypeFilter && post.typeId
                && filterOptions.types.includes(post.typeId);
            const categoryMatches = hasCategoryFilter && post.categoryId
                && filterOptions.categories.includes(post.categoryId);

            if (!typeMatches && !categoryMatches) {
                return false;
            }
        }

        return true;
    });
};

const usePostsFilter = (): PostsFilterUtils => {
    const defaultFilterOptions: FilterOptions = {
        dates: [null, null],
        types: [],
        categories: [],
    };
    const [filterOptions, setFilterOptions] = useState(defaultFilterOptions);

    const emptyFilter = useMemo(
        () => isEmptyFilter(filterOptions),
        [filterOptions],
    );

    return {
        options: filterOptions,
        set: setFilterOptions,
        empty: emptyFilter,
        clear: () => setFilterOptions(defaultFilterOptions),
    };
};

const getPostsByIds = async (ids: string[]) => {
    const posts = await Promise.all(ids.map(getPost));

    return posts.filter(p => p) as Post[];
};

const getMissingPostsIds = (
    postsIndex: PostIndex[],
    postsLength: number,
    size: number,
): string[] => {
    const startIndex = postsLength;
    const endIndex = Math.min(startIndex + size, postsIndex.length);

    if (startIndex >= postsIndex.length) {
        return [];
    }

    return postsIndex.slice(startIndex, endIndex).map(({ id }) => id);
};

const getMissingPosts = async (
    postsIndex: PostIndex[],
    postsLength: number,
    size: number,
) => {
    return getPostsByIds(getMissingPostsIds(postsIndex, postsLength, size));
};

export const PostsContext = createContext<PostsContextType | undefined>(
    undefined,
);

export const PostsProvider = (
    { children }: PropsWithChildren,
) => {
    const {
        categories,
        types,
        postsIndex,
        loading: loadingBase,
    } = usePostsBase();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loadingPosts, setLoadingPosts] = useState<boolean>(false);
    const filter = usePostsFilter();
    const filteredPostsIndex = useMemo(
        () => filterPostsIndex(filter.options, postsIndex),
        [filter.options, postsIndex],
    );

    const loadPosts = useCallback((
        more: number,
        refetch: boolean = false,
    ) => {
        if (loadingPosts || (!refetch && (posts.length >= postsIndex.length))) {
            return;
        }

        (async () => {
            setLoadingPosts(true);

            try {
                const newPosts = await getMissingPosts(
                    filteredPostsIndex,
                    refetch ? 0 : posts.length,
                    more,
                );
                const enrichedPosts = newPosts.map(post => enrichPost(
                    post,
                    types,
                    categories,
                ));

                setPosts(previous => {
                    if (refetch) {
                        return previous;
                    }

                    return [...previous, ...enrichedPosts];
                });
            } catch (e) {
                console.error(e);
            }

            setLoadingPosts(false);
        })();
    }, [filteredPostsIndex, posts.length, types, categories]);

    useEffect(() => {
        if (!loadingBase && !posts.length) {
            loadPosts(config.postsBatch);
        }
    }, [loadingBase]);

    useEffect(() => {
        if (!postsIndex.length) {
            return;
        }

        loadPosts(config.postsBatch, true);
    }, [filter.options]);

    const loadMore = (more = config.postsBatch) => {
        loadPosts(more);
    };

    return <PostsContext.Provider
        value={ {
            categories,
            types,
            posts,
            loading: {
                base: loadingBase,
                posts: loadingPosts,
            },
            loadMore,
            filter,
        } }
    >
        { children }
    </PostsContext.Provider>;
};

export const usePostsContext = (): PostsContextType => {
    const context = useContext(PostsContext);

    if (context === undefined) {
        throw new Error(
            'usePostsContext must be used within an PostsProvider',
        );
    }

    return context;
};
