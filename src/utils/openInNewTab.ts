export default function openInNewTab(url: string): Window | null {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');

    if (newWindow) {
        newWindow.opener = null;
    }

    return newWindow;
}
