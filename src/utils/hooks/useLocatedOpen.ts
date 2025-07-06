import { useEffect } from 'react';
import useOpen, { UseOpenUtils } from '@/utils/hooks/useOpen';

export interface UseLocatedOpenOptions {
    pathname: string;
    backPathname?: string;
}

export default function useLocatedOpen(
    {
        pathname,
        backPathname = '/',
    }: UseLocatedOpenOptions,
): UseOpenUtils {
    const startsWith = window.location.pathname.startsWith(pathname);
    const utils = useOpen(startsWith);

    useEffect(() => {
        if (utils.opened && !startsWith) {
            window.history.replaceState(null, '', pathname);

            return;
        }

        if (!utils.opened && startsWith) {
            window.history.replaceState(null, '', backPathname);
        }
    }, [utils.opened]);

    return utils;
}
