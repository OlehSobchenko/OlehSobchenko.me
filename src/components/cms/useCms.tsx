import { useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import CMS from 'decap-cms-app';
import UniqueIdControl from '@/components/cms/UniqueIdControl';
import getCmsConfig from '@/components/cms/utils/cmsConfig';
import config from '@/config';

export default function useCms(
    processIndexing: () => void,
) {
    const locale = useLocale();
    const [mounted, setMounted] = useState(false);
    const [authorized, setAuthorized] = useState(false);
    const CMSRef = useRef<typeof CMS>(null);

    useEffect(() => {
        if (!mounted) {
            setAuthorized(!!localStorage.getItem('decap-cms-user'));
            setMounted(true);

            return;
        }

        if (!window.CMS && authorized) {
            window.CMS_MANUAL_INIT = true;
            window.CMS = CMS;
            CMSRef.current = CMS;

            CMS.registerWidget('uuid', UniqueIdControl);
            CMS.registerEventListener({
                name: 'postSave',
                handler: processIndexing,
            });
            CMS.registerEventListener({
                name: 'postUnpublish',
                handler: processIndexing,
            });
            CMS.init({
                config: getCmsConfig({ locale, repo: config.contentRepo }),
            });
        }
    }, [mounted, authorized]);

    const authorize = (
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

            setAuthorized(true);
        }).catch(() => {
            onError?.();
        });
    };

    return { mounted, authorized, authorize, CMSApp: CMSRef.current };
}
