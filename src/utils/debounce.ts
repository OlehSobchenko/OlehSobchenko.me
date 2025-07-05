export default function debounce<T extends (...args: any[]) => void>(
    fn: T,
    delay: number = 350,
): T {
    let timer: NodeJS.Timeout;

    return function (...args: any[]) {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    } as T;
}
