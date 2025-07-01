import { useRouter } from 'next/navigation';
import openInNewTab from '@/utils/openInNewTab';

export default function useOpenLink() {
    const router = useRouter();

    return (path: string, newTab = false) => () => {
        if (newTab) {
            openInNewTab(path)?.focus();
        }

        const isPWA = window.matchMedia(
                '(display-mode: standalone)',
            ).matches
            || (window.navigator as any).standalone === true;

        if (isPWA) {
            router.push(path);

            return;
        }

        openInNewTab(path)?.focus();
    };
}
