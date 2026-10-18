'use client';

import {
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useState,
} from 'react';
import { Post } from '@/types';
import PostModal from '@/components/posts/PostModal';
import { useEventListener } from '@/utils/hooks/useEventListener';

type OpenPost = (post: Post) => void;

export const OpenedPostContext = createContext<OpenPost | undefined>(
    undefined,
);

/**
 * Opens posts as an overlay above the current page instead of navigating
 * to the post route, so the page underneath (and its scroll position)
 * stays intact. The URL still changes to the post link, and the browser
 * back gesture closes the overlay.
 */
export const OpenedPostProvider = ({ children }: PropsWithChildren) => {
    const [post, setPost] = useState<Post | null>(null);

    useEventListener('popstate', () => setPost(null));

    const openPost = useCallback((post: Post) => {
        window.history.pushState(null, '', `/post/${ post.id }`);
        setPost(post);
    }, []);

    return <OpenedPostContext.Provider value={ openPost }>
        { children }
        { post && <PostModal
            id={ post.id }
            post={ post }
            onClose={ () => window.history.back() }
        /> }
    </OpenedPostContext.Provider>;
};

export const useOpenedPost = (): OpenPost | undefined => {
    return useContext(OpenedPostContext);
};
