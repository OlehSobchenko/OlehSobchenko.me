'use client';

import { useEffect, useState } from 'react';
import MainPage from '@/components/pages/MainPage';
import PostPage from '@/components/pages/PostPage';

export default function Custom404() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const [path, id] = window.location.pathname.split('/').filter(i => i);

    if (['post', 'p'].includes(path) && id) {
        return <PostPage id={ id }/>;
    }

    return <MainPage/>;
}
