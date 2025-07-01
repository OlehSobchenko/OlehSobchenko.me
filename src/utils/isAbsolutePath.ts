export default function isAbsolutePath(path: string) {
    return path.startsWith('/') || /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(path);
}
