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
    hasMore: boolean;
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

    const time = new Date(post.happenedAt).getTime();

    if (start && start.getTime() > time) {
        return false;
    }

    return !(end && end.getTime() < time);
};

const isEmptyFilter = (filterOptions: FilterOptions): boolean => (
    filterOptions.dates.every(date => date === null) &&
    filterOptions.types.length === 0 &&
    filterOptions.categories.length === 0
);

const filterPostsIndex = (
    filterOptions: FilterOptions,
    posts: PostIndex[],
): PostIndex[] => {
    if (isEmptyFilter(filterOptions)) {
        return posts;
    }

    return posts.filter(post => {
        if (!applyDatesFilter(post, filterOptions.dates)) {
            return false;
        }

        const hasTypeFilter = filterOptions.types.length > 0;
        const hasCategoryFilter = filterOptions.categories.length > 0;

        if (hasTypeFilter || hasCategoryFilter) {
            const typeMatches = hasTypeFilter && post.typeId
                && filterOptions.types.includes(post.typeId);
            const categoryMatches = hasCategoryFilter && post.categoryId
                && filterOptions.categories.includes(post.categoryId);

            return typeMatches || categoryMatches;
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

const getPostsByIndices = async (indices: PostIndex[]): Promise<Post[]> => {
    if (indices.length === 0) {
        return [];
    }

    const posts = await Promise.all(indices.map(i => getPost(i.id, i.audioId)));

    return posts.filter((p): p is Post => p !== null);
};

export const PostsContext = createContext<PostsContextType | undefined>(
    undefined,
);

export const PostsProvider = ({ children }: PropsWithChildren) => {
    const {
        categories,
        types,
        postsIndex,
        loading: loadingBase,
    } = usePostsBase();
    const filter = usePostsFilter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const filteredPostsIndex = useMemo(
        () => filterPostsIndex(filter.options, postsIndex),
        [filter.options, postsIndex],
    );

    useEffect(() => {
        if (loadingBase) {
            return;
        }

        const loadInitialPosts = async () => {
            setIsLoading(true);
            setPosts([]);

            const postsIndices = filteredPostsIndex
                .slice(0, config.postsBatch);

            try {
                const newPosts = await getPostsByIndices(postsIndices);
                const enrichedPosts = newPosts.map(post => enrichPost(
                    post,
                    types,
                    categories,
                ));

                setPosts(enrichedPosts);
                setHasMore(enrichedPosts.length >= config.postsBatch);
            } catch (e) {
                console.error('Failed to load initial posts:', e);
                setHasMore(false);
            } finally {
                setIsLoading(false);
            }
        };

        loadInitialPosts().then();
    }, [filteredPostsIndex, loadingBase, types, categories]);

    const loadMore = useCallback(async () => {
        if (isLoading || isFetchingMore || !hasMore) {
            return;
        }

        setIsFetchingMore(true);

        try {
            const nextPostsIndices = filteredPostsIndex
                .slice(posts.length, posts.length + config.postsBatch);

            if (nextPostsIndices.length === 0) {
                setHasMore(false);

                return;
            }

            const newPosts = await getPostsByIndices(nextPostsIndices);
            const enrichedPosts = newPosts.map(post => enrichPost(
                post,
                types,
                categories,
            ));

            if (enrichedPosts.length < config.postsBatch) {
                setHasMore(false);
            }

            setPosts(prevPosts => {
                const existingIds = new Set(prevPosts.map(p => p.id));
                const uniqueNewPosts = enrichedPosts.filter(
                    p => !existingIds.has(p.id),
                );

                return [...prevPosts, ...uniqueNewPosts];
            });
        } catch (e) {
            console.error('Failed to load more posts:', e);
        } finally {
            setIsFetchingMore(false);
        }
    }, [
        isLoading,
        isFetchingMore,
        hasMore,
        posts.length,
        filteredPostsIndex,
        types,
        categories,
    ]);

    const contextValue = useMemo(() => ({
        categories,
        types,
        posts,
        loading: {
            base: loadingBase,
            posts: isLoading || isFetchingMore,
        },
        hasMore,
        loadMore,
        filter,
    }), [
        categories,
        types,
        posts,
        loadingBase,
        isLoading,
        isFetchingMore,
        hasMore,
        loadMore,
        filter,
    ]);

    return <PostsContext.Provider value={ contextValue }>
        { children }
    </PostsContext.Provider>;
};

export const usePostsContext = (): PostsContextType => {
    const context = useContext(PostsContext);

    if (context === undefined) {
        throw new Error('usePostsContext must be used within a PostsProvider');
    }

    return context;
};
