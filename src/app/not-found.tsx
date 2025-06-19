'use client';
import MainContent from '@/components/MainContent';
import { useEffect, useState } from 'react';
import PostModal from '@/components/posts/PostModal';
import { useRouter } from 'next/navigation';

export default function Custom404() {
    const router = useRouter();
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

    if (path == 'admin') {
        router.push('/admin/index.html');

        return <div className="w-full h-screen justify-center items-center flex">
            <p>Redirecting...</p>
        </div>;
    }

    return <MainContent/>;
}
