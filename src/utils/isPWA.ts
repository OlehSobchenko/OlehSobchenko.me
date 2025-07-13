import config from '@/config';

export default function isPWA() {
    if (config.pwaMode) {
        return true;
    }

    return window.matchMedia(
            '(display-mode: standalone)',
        ).matches
        || (window.navigator as any).standalone === true;
}
