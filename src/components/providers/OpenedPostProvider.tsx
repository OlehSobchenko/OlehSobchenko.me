'use client';

import {
    PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
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
 * to the post route, so the page underneath stays intact. The URL still
 * changes to the post link, and the browser back gesture closes the overlay.
 */
export const OpenedPostProvider = ({ children }: PropsWithChildren) => {
    const [post, setPost] = useState<Post | null>(null);
    const opened = useRef(false);
    const scrollY = useRef<number | null>(null);

    useEventListener('popstate', () => {
        opened.current = false;
        setPost(null);
    });

    // Browsers may reset the page scroll while it is locked by the modal or
    // restore a stale one on history back (Safari does), so put it back
    // explicitly once the overlay is gone.
    useEffect(() => {
        const y = scrollY.current;

        if (post || y === null) {
            return;
        }

        scrollY.current = null;

        const restore = () => window.scrollTo(0, y);

        restore();
        requestAnimationFrame(restore);
    }, [post]);

    const openPost = useCallback((post: Post) => {
        // "Read in full" sits inside the clickable card, so a single tap
        // can call this twice.
        if (opened.current) {
            return;
        }

        opened.current = true;
        scrollY.current = window.scrollY;
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
