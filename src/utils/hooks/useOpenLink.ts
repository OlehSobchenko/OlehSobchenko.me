import { useRouter } from 'next/navigation';
import openInNewTab from '@/utils/openInNewTab';
import isPWA from '@/utils/isPWA';

export default function useOpenLink() {
    const router = useRouter();

    return (path: string, newTab = false) => () => {
        if (newTab) {
            openInNewTab(path)?.focus();
        }

        const pwa = isPWA();

        if (pwa) {
            router.push(path);

            return;
        }

        openInNewTab(path)?.focus();
    };
}
