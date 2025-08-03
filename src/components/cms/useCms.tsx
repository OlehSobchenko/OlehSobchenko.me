import { useCallback, useEffect, useRef, useState } from 'react';
import CMS from 'decap-cms-app';
import UniqueIdControl from '@/components/cms/UniqueIdControl';
import getCmsConfig from '@/components/cms/utils/cmsConfig';
import config from '@/config';
import getCmsToken from '@/components/cms/utils/getCmsToken';
import useLocale from '@/utils/hooks/useLocale';
import addLinkToPost from '@/components/cms/utils/addLinkToPost';
import MaterialIconsControl from '@/components/cms/MaterialIconsControl';

export default function useCms(
    processIndexing: () => void,
) {
    const locale = useLocale();
    const [mounted, setMounted] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const CMSRef = useRef<typeof CMS>(null);

    useEffect(() => {
        if (!mounted) {
            setAuthorized(!!getCmsToken());
            setMounted(true);
            return;
        }

        if (!window.CMS && authorized) {
            window.CMS_MANUAL_INIT = true;
            window.CMS = CMS;
            CMSRef.current = CMS;

            const cmsConfig = getCmsConfig({
                locale: 'uk',
                repo: config.contentRepo,
            });

            CMS.registerWidget('uuid', UniqueIdControl);
            CMS.registerWidget('material-symbols', MaterialIconsControl);
            CMS.registerEventListener({
                name: 'postSave',
                handler: processIndexing,
            });
            CMS.registerEventListener({
                name: 'postUnpublish',
                handler: processIndexing,
            });
            CMS.init({
                config: cmsConfig,
            });

            addLinkToPost();
        }
    }, [mounted, authorized, locale, processIndexing]);

    const authorize = useCallback((
        token: string,
        onError?: () => void,
    ) => {
        fetch('https://api.github.com/user', {
            headers: {
                'Accept': 'application/vnd.github+json',
                'Authorization': `Bearer ${ token }`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
        }).then(res => res.json()).then(json => {
            if (!json) {
                onError?.();
                return;
            }

            localStorage.setItem('decap-cms-user', JSON.stringify({
                ...json,
                token,
                backendName: 'github',
            }));

            setTimeout(() => {
                setAuthorized(true);
            }, 0);
        }).catch(() => {
            onError?.();
        });
    }, []);

    const cmsLogin = useCallback(() => {
        setTimeout(() => {
            setAuthorized(true);
        }, 0);
    }, []);

    return { mounted, authorized, authorize, CMSApp: CMSRef.current, cmsLogin };
}