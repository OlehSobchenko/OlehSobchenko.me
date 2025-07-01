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
import getIndexedEntries from '@/utils/data/getIndexedEntries';
import enrichPost from '@/utils/data/enrichPost';

export interface FilterOptions {
    categories: string[];
    types: string[];
    dates: [Date | null, Date | null];
}

export interface FilterUtils {
    options: FilterOptions;
    set: Dispatch<SetStateAction<FilterOptions>>;
    empty: boolean;
}

interface PostsBaseUtils {
    categories: Type[];
    types: Category[];
    postsIndex: PostIndex[];
    loading: boolean;
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
    filter: FilterUtils;
}

const applyDatesFilter = (
    post: Post,
    dates: [Date | null, Date | null],
): boolean => {
    const [start, end] = dates;
    const happenedAt = new Date(post.happenedAt);
    const time = happenedAt.getTime();
    const startOk = start ? start.getTime() <= time : true;
    const endOk = end ? end.getTime() >= time : true;

    return startOk && endOk;
};

const getFilteredPostsIndex = (
    filterOptions: FilterOptions,
    posts: PostIndex[],
): PostIndex[] => {
    return Object.keys(filterOptions).length
        ? posts.filter(post => {
            const typeOk = filterOptions.types?.length
                ? post.typeId
                    ? filterOptions.types.includes(post.typeId)
                    : false
                : true
            ;
            const categoryOk = filterOptions.categories?.length
                ? post.categoryId
                    ? filterOptions.categories.includes(post.categoryId)
                    : false
                : true
            ;
            const dateOk = filterOptions.dates?.length
                ? applyDatesFilter(post, filterOptions.dates)
                : true
            ;

            return typeOk && categoryOk && dateOk;
        })
        : posts;
};

const usePostsBase = (): PostsBaseUtils => {
    const [categories, setCategories] = useState<Type[]>([]);
    const [types, setTypes] = useState<Category[]>([]);
    const [postsIndex, setPostsIndex] = useState<PostIndex[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                const [
                    rawPostsIndex,
                    loadedTypes = [],
                    loadedCategories = [],
                ] = await Promise.all([
                    getIndexedEntries('posts'),
                    getIndexedEntries('types'),
                    getIndexedEntries('categories'),
                ]);
                const parsedPostsIndex = Object.entries(rawPostsIndex).map((
                    [id, content],
                ) => {
                    const [
                        categoryId,
                        typeId,
                        createdAt,
                        happenedAt,
                    ] = String(content).split('/');

                    return {
                        id,
                        categoryId,
                        typeId,
                        createdAt,
                        happenedAt,
                    };
                }).toSorted((a, b) => {
                    return new Date(b.happenedAt).getTime() -
                        new Date(a.happenedAt).getTime();
                });

                setPostsIndex(parsedPostsIndex);
                setCategories(loadedCategories);
                setTypes(loadedTypes);
            } catch (e) {
                console.error(e);
            }

            setLoading(false);
        })();
    }, []);

    return { categories, types, postsIndex, loading };
};

const useFilter = (): FilterUtils => {
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        dates: [null, null],
        types: [],
        categories: [],
    });

    const emptyFiler = useMemo(() => {
        return Object.values(filterOptions).every(
            i => !i.length || Array.isArray(i)
                ? i.every((ii: unknown) => !ii)
                : false,
        );
    }, [filterOptions]);

    return {
        options: filterOptions,
        set: setFilterOptions,
        empty: emptyFiler,
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
    return postsIndex
        .slice(postsLength, postsLength + size)
        .map(({ id }) => id);
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
    const [loadingPosts, setLoadingPosts] = useState<boolean>(true);
    const filter = useFilter();
    const [size, setSize] = useState<number>(config.postsBatch);
    const filteredPostsIndex = useMemo(
        () => getFilteredPostsIndex(filter.options, postsIndex),
        [filter.options, postsIndex],
    );

    const loadPosts = useCallback(() => {
        setLoadingPosts(true);

        (async () => {
            try {
                const newPosts = await getMissingPosts(
                    filteredPostsIndex,
                    posts.length,
                    size,
                );
                const enrichedPosts = newPosts.map(post => enrichPost(
                    post,
                    types,
                    categories,
                ));

                setPosts(previous => ([...previous, ...enrichedPosts]));
            } catch (e) {
                console.error(e);
            }

            setLoadingPosts(false);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        filteredPostsIndex,
        posts.length,
        size,
        types,
        categories,
        filter.options,
    ]);

    useEffect(() => {
        if (!loadingBase) {
            loadPosts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadingBase, size]);

    useEffect(() => {
        if (!postsIndex.length) {
            return;
        }

        setPosts([]);
        setSize(config.postsBatch);
        loadPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter.options]);

    const loadMore = (
        more = config.postsBatch,
    ) => setSize(previous => previous + more);

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
