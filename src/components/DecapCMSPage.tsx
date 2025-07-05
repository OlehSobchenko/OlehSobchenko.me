'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { suppressDecapCMSErrors } from '@/utils/suppressDecapCMSErrors';

const DecapCMS = dynamic(
    () => import('@/components/cms/DecapCMS'),
    { ssr: false },
);

export default function AdminPage() {
    useEffect(() => {
        suppressDecapCMSErrors();
    }, []);

    return <DecapCMS />;
}


