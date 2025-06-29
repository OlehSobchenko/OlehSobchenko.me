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

    const { mounted, authorized, authorize } = useCms(processIndexing);

    if (!mounted) {
        return null;
    }

    if (!authorized) {
        return <CmsLoginForm authorize={ authorize }/>;
    }

    return <ErrorBoundary errorComponent={ () => <div>CMS Failed</div> }>
        <div className="min-h-screen flex flex-col justify-between">
            <div>
                <div id="nc-root"/>
            </div>
            <Indexing indexing={ indexing } onClick={ processIndexing }/>
        </div>
    </ErrorBoundary>;
}
