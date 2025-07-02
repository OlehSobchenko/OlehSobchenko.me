import { useCallback, useRef, useEffect } from 'react';

export interface UseIntersectionObserverCallbackOptions {
    onIntersect?: (entry: IntersectionObserverEntry) => void;
    onEnter?: (entry: IntersectionObserverEntry) => void;
    onExit?: (entry: IntersectionObserverEntry) => void;
    threshold?: number | number[];
    root?: Element | null;
    rootMargin?: string;
    triggerOnce?: boolean;
    enabled?: boolean;
    debounceMs?: number;
}

export default function useIntersectionObserverCallback({
    onIntersect,
    onEnter,
    onExit,
    threshold = 0,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
    enabled = true,
    debounceMs = 0,
}: UseIntersectionObserverCallbackOptions = {}) {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const hasTriggeredRef = useRef(false);
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastIntersectingStateRef = useRef<boolean | null>(null);

    const debounce = useCallback((callback: () => void, delay: number) => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        debounceTimeoutRef.current = setTimeout(callback, delay);
    }, []);

    const handleIntersection = useCallback((
        entry: IntersectionObserverEntry,
    ) => {
        const execute = () => {
            onIntersect?.(entry);

            if (
                entry.isIntersecting
                && lastIntersectingStateRef.current !== true
            ) {
                onEnter?.(entry);
                lastIntersectingStateRef.current = true;
            } else if (
                !entry.isIntersecting
                && lastIntersectingStateRef.current !== false
            ) {
                onExit?.(entry);
                lastIntersectingStateRef.current = false;
            }

            if (entry.isIntersecting && triggerOnce) {
                hasTriggeredRef.current = true;
                cleanup();
            }
        };

        if (debounceMs > 0) {
            debounce(execute, debounceMs);
        } else {
            execute();
        }
    }, [onIntersect, onEnter, onExit, triggerOnce, debounceMs, debounce]);

    const cleanup = useCallback(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
            debounceTimeoutRef.current = null;
        }
    }, []);

    const ref = useCallback((node: Element | null) => {
        cleanup();

        if (!node || !enabled) return;
        if (triggerOnce && hasTriggeredRef.current) return;

        observerRef.current = new IntersectionObserver(
            ([entry]) => handleIntersection(entry),
            {
                threshold,
                root,
                rootMargin,
            },
        );

        observerRef.current.observe(node);
    }, [
        threshold,
        root,
        rootMargin,
        triggerOnce,
        enabled,
        handleIntersection,
        cleanup,
    ]);

    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    return { ref };
}
