'use client';
import MainContent from '@/components/MainContent';
import { useEffect, useState } from 'react';
import PostModal from '@/components/posts/PostModal';

export default function Custom404() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const [path, id] = window.location.pathname.split('/').filter(i => i);

    if (path == 'post' && id) {
        return <PostModal id={ id }/>;
    }

    return <MainContent/>;
}
