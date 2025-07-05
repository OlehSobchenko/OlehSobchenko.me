import { useEffect, useState } from 'react';
import { Category, PostIndex, Type } from '@/types';
import getIndexedEntries from '@/utils/data/getIndexedEntries';
import config from '@/config';

export interface PostsBaseUtils {
    categories: Type[];
    types: Category[];
    postsIndex: PostIndex[];
    loading: boolean;
}

export default function usePostsBase(): PostsBaseUtils {
    const [categories, setCategories] = useState<Type[]>([]);
    const [types, setTypes] = useState<Category[]>([]);
    const [postsIndex, setPostsIndex] = useState<PostIndex[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                const [
                    rawPostsIndex = {},
                    loadedTypes = [],
                    loadedCategories = [],
                ] = await Promise.all([
                    getIndexedEntries('posts', true),
                    getIndexedEntries('types'),
                    getIndexedEntries('categories'),
                ]);
                const parsedPostsIndex = Object.entries(rawPostsIndex || {})
                    .map(([id, content]) => {
                        const [
                            categoryId,
                            typeId,
                            createdAt,
                            happenedAt,
                            audioId,
                        ] = String(content).split(config.postsIndexSeparator);

                        return {
                            id,
                            categoryId,
                            typeId,
                            createdAt,
                            happenedAt,
                            audioId,
                        };
                    })
                    .toSorted((a, b) => {
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
