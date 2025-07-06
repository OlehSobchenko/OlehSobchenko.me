export default function parseJSON<T = any>(
    input: any,
    defaultValue?: T,
): T {
    if (!input) {
        return defaultValue as T;
    }

    try {
        return JSON.parse(input);
    } catch {
        return defaultValue as T;
    }
}
