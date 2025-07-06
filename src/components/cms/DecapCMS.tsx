'use client';

import { useState } from 'react';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import useCms from '@/components/cms/useCms';
import Indexing from '@/components/cms/Indexing';
import CmsLoginForm from '@/components/cms/CmsLoginForm';
import entitiesIndexing from '@/components/cms/utils/entitiesIndexing';

export default function DecapCMS() {
    const [indexing, setIndexing] = useState(false);

    const processIndexing = () => {
        setIndexing(true);
        entitiesIndexing()
            .then(() => setIndexing(false))
            .catch(() => setIndexing(false))
        ;
    };

    const {
        mounted,
        authorized,
        authorize,
        cmsLogin,
    } = useCms(processIndexing);

    if (!mounted) {
        return null;
    }

    if (!authorized) {
        return <CmsLoginForm
            onAuthorize={ authorize }
            onCmsLogin={ cmsLogin }
        />;
    }

    return <ErrorBoundary errorComponent={ () => <div>CMS Failed</div> }>
        <div className="min-h-screen flex flex-col justify-between">
            <div>
                <div id="nc-root" className="pb-56"/>
            </div>
            <Indexing indexing={ indexing } onIndexing={ processIndexing }/>
        </div>
    </ErrorBoundary>;
}
