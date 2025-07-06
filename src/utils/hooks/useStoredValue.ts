import { useCallback, useEffect, useState, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { useEventCallback } from '@/utils/hooks/useEventCallback';
import { useEventListener } from '@/utils/hooks/useEventListener';
import parseJSON from '@/utils/pasreJSON';

declare global {
    interface WindowEventMap {
        'local-storage': CustomEvent;
    }
}

export interface UseLocalStorageOptions<T> {
    serializer?: (value: T) => string;
    deserializer?: (value: string) => T;
    initializeWithValue?: boolean;
    enablePolling?: boolean;
    pollingInterval?: number;
}

const IS_SERVER = typeof window === 'undefined';

export default function useStoredValue<T>(
    key: string,
    initialValue: T | (() => T),
    options: UseLocalStorageOptions<T> = {},
): [T, Dispatch<SetStateAction<T>>, () => void] {
    const {
        initializeWithValue = true,
        enablePolling = true,
        pollingInterval = 50,
        serializer: customSerializer,
        deserializer: customDeserializer,
    } = options;

    const serializer = useCallback<(value: T) => string>(
        value => {
            if (customSerializer) {
                return customSerializer(value);
            }

            return JSON.stringify(value);
        },
        [customSerializer], // Only depends on the actual serializer function
    );

    const deserializer = useCallback<(value: string) => T>(
        value => {
            if (customDeserializer) {
                return customDeserializer(value);
            }

            if (value === 'undefined') {
                return undefined as unknown as T;
            }

            const defaultValue = initialValue instanceof Function
                ? initialValue()
                : initialValue;

            return parseJSON<T>(value, defaultValue);
        },
        [customDeserializer, initialValue], // More stable dependencies
    );

    const readValue = useCallback((): T => {
        const initialValueToUse =
            initialValue instanceof Function ? initialValue() : initialValue;

        if (IS_SERVER) {
            return initialValueToUse;
        }

        try {
            const raw = window.localStorage.getItem(key);

            return raw ? deserializer(raw) : initialValueToUse;
        } catch {
            return initialValueToUse;
        }
    }, [initialValue, key, deserializer]);

    const [storedValue, setStoredValue] = useState(() => {
        if (initializeWithValue) {
            return readValue();
        }

        return initialValue instanceof Function ? initialValue() : initialValue;
    });

    const lastKnownValueRef = useRef<string | null>(null);
    const lastKnownDeserializedValueRef = useRef<T | null>(null);
    const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const areValuesEqual = useCallback((a: T, b: T): boolean => {
        try {
            return JSON.stringify(a) === JSON.stringify(b);
        } catch {
            return a === b;
        }
    }, []);

    const setValue: Dispatch<SetStateAction<T>> = useEventCallback(value => {
        try {
            const newValue = value instanceof Function
                ? value(readValue())
                : value;

            const serializedValue = serializer(newValue);
            window.localStorage.setItem(key, serializedValue);
            setStoredValue(newValue);
            lastKnownValueRef.current = serializedValue;
            lastKnownDeserializedValueRef.current = newValue;
            window.dispatchEvent(new StorageEvent('local-storage', { key }));
        } catch { /* empty */
        }
    });

    const removeValue = useEventCallback(() => {
        if (IS_SERVER) {
            console.warn(
                `Tried removing localStorage key "${ key }" even though environment is not a client`,
            );
        }

        const defaultValue = initialValue instanceof Function
            ? initialValue()
            : initialValue;

        window.localStorage.removeItem(key);
        setStoredValue(defaultValue);
        lastKnownValueRef.current = null;
        lastKnownDeserializedValueRef.current = defaultValue;
        window.dispatchEvent(new StorageEvent('local-storage', { key }));
    });

    const pollForChanges = useCallback(() => {
        if (IS_SERVER) return;

        try {
            const currentValue = window.localStorage.getItem(key);

            if (currentValue !== lastKnownValueRef.current) {
                const newDeserializedValue = readValue();

                if (lastKnownDeserializedValueRef.current === null ||
                    !areValuesEqual(
                        newDeserializedValue,
                        lastKnownDeserializedValueRef.current,
                    )) {
                    lastKnownValueRef.current = currentValue;
                    lastKnownDeserializedValueRef.current =
                        newDeserializedValue;
                    setStoredValue(newDeserializedValue);
                } else {
                    lastKnownValueRef.current = currentValue;
                }
            }
        } catch { /* empty */ }
    }, [key, readValue, areValuesEqual]);

    useEffect(() => {
        const value = readValue();
        setStoredValue(value);

        if (!IS_SERVER) {
            lastKnownValueRef.current = window.localStorage.getItem(key);
            lastKnownDeserializedValueRef.current = value;
        }
    }, [key, readValue]);

    useEffect(() => {
        if (enablePolling && !IS_SERVER) {
            pollingIntervalRef.current = setInterval(
                pollForChanges,
                pollingInterval,
            );

            return () => {
                if (pollingIntervalRef.current) {
                    clearInterval(pollingIntervalRef.current);
                }
            };
        }
    }, [enablePolling, pollingInterval, pollForChanges]);

    const handleStorageChange = useCallback(
        (event: StorageEvent | CustomEvent) => {
            if (
                (event as StorageEvent).key
                && (event as StorageEvent).key !== key
            ) {
                return;
            }

            const newValue = readValue();

            if (
                lastKnownDeserializedValueRef.current === null
                || !areValuesEqual(
                    newValue,
                    lastKnownDeserializedValueRef.current,
                )
            ) {
                setStoredValue(newValue);
                lastKnownDeserializedValueRef.current = newValue;
            }

            if (!IS_SERVER) {
                lastKnownValueRef.current = window.localStorage.getItem(key);
            }
        },
        [key, readValue, areValuesEqual],
    );

    useEventListener('storage', handleStorageChange);
    useEventListener('local-storage', handleStorageChange);

    return [storedValue, setValue, removeValue];
}