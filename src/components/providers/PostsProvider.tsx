'use client';

import {
    createContext,
    useContext,
    PropsWithChildren,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    useCallback,
} from 'react';
import { Category, Post, Type } from '@/components/posts/types';
import config from '@/config';

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

export interface PostsContextType {
    posts: Post[];
    categories: Category[];
    types: Type[];
    loading: boolean;
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

export const PostsContext = createContext<
    PostsContextType | undefined
>(undefined);

export const getIndexedPosts = async (repo: string) => {
    return getEntries(repo, 'posts');
};

export const getTypes = async (repo: string) => {
    return getEntries(repo, 'types');
};

export const getCategories = async (repo: string) => {
    return getEntries(repo, 'categories');
};

const getEntries = async (
    repo: string,
    entity: string,
) => {
    const response = await fetch(
        `https://raw.githubusercontent.com/${
            repo }/main/content/${ entity }_index.json`,
    );

    return response.ok ? await response.json() : null;
};

export const PostsProvider = (
    { children }: PropsWithChildren,
) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [categories, setCategories] = useState<Type[]>([]);
    const [types, setTypes] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filterOptions, setFilterOptions] = useState<FilterOptions>({
        dates: [null, null],
        types: [],
        categories: [],
    });
    const [size, setSize] = useState<number>(6);

    useEffect(() => {
        (async () => {
            try {
                const all = await Promise.all([
                    getIndexedPosts(config.contentRepo),
                    getTypes(config.contentRepo),
                    getCategories(config.contentRepo),
                ]);

                console.info(all);

                const [
                    { default: loadedPosts },
                    { default: loadedTypes },
                    { default: loadedCategories },
                ] = await Promise.all([
                    import('@/data/posts.json'),
                    import('@/data/types.json'),
                    import('@/data/categories.json'),
                ]);
                const fullPosts = loadedPosts.map(post => ({
                    ...post,
                    type: loadedTypes.find(type => type.id === post.typeId),
                    category: loadedCategories.find(
                        category => category.id === post.categoryId,
                    ),
                }));

                setPosts(fullPosts);
                setCategories(loadedCategories);
                setTypes(loadedTypes);
            } catch (e) {
                console.error(e);
            }

            setLoading(false);
        })();
    }, []);

    const loadPosts = useCallback(() => {
        setLoading(true);

        (async () => {
            try {
                const {
                    default: loadedPosts,
                } = await import('@/data/posts.json');
                const fullPosts = loadedPosts.map(post => ({
                    ...post,
                    type: types.find(type => type.id === post.typeId),
                    category: categories.find(
                        category => category.id === post.categoryId,
                    ),
                }));
                const filteredPosts = Object.keys(filterOptions).length
                    ? fullPosts.filter(post => {
                        const typeOk = filterOptions.types?.length
                            ? filterOptions.types.includes(post.typeId)
                            : true
                        ;
                        const categoryOk = filterOptions.categories?.length
                            ? filterOptions.categories.includes(post.categoryId)
                            : true
                        ;
                        const dateOk = filterOptions.dates?.length
                            ? applyDatesFilter(post, filterOptions.dates)
                            : true
                        ;

                        return typeOk && categoryOk && dateOk;
                    })
                    : fullPosts
                ;

                setPosts(filteredPosts);
            } catch (e) {
                console.error(e);
            }

            setLoading(false);
        })();
    }, [categories, filterOptions, types]);

    useEffect(() => {
        if (!loading) {
            loadPosts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterOptions, size]);

    const loadMore = (more?: number) => {
        setSize(prev => prev + (more || 6));
    };

    return <PostsContext.Provider
        value={ {
            categories,
            types,
            posts,
            loading,
            loadMore,
            filter: {
                options: filterOptions,
                set: setFilterOptions,
                empty: Object.values(filterOptions).every(
                    i => !i.length || Array.isArray(i)
                        ? i.every((ii: unknown) => !ii)
                        : false,
                ),
            },
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
