export default function isPWA() {
    return window.matchMedia(
            '(display-mode: standalone)',
        ).matches
        || (window.navigator as any).standalone === true;
}
