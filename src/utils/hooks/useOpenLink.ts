import { useRouter } from 'next/navigation';
import openInNewTab from '@/utils/openInNewTab';
import isPWA from '@/utils/isPWA';

export default function useOpenLink() {
    const router = useRouter();

    return (path: string, newTab = false) => () => {
        const pwa = isPWA();

        if (pwa) {
            router.push(path);

            return;
        }

        if (newTab) {
            openInNewTab(path)?.focus();
        } else {
            router.push(path);
        }
    };
}

