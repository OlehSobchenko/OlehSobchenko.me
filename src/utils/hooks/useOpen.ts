import { useState } from 'react';

export interface UseOpenUtils {
    opened: boolean;
    open: () => void;
    close: () => void;
}

export default function useOpen(defaultValue = false): UseOpenUtils {
    const [opened, setOpened] = useState(defaultValue);

    const open = () => setOpened(true);

    const close = () => setOpened(false);

    return { opened, open, close };
}
