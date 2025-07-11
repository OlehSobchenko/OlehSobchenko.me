import OutlinedButton from '@/components/base/OutlinedButton';
import React, { useCallback, useEffect } from 'react';
import SpinLoader from '@/components/base/SpinLoader';
import useStoredValue from '@/utils/hooks/useStoredValue';
import config from '@/config';

interface UseBeforeUnloadOptions {
    when: boolean;
    message?: string;
    onBeforeUnload?: () => void;
}

function useBeforeUnload(
    { when, message, onBeforeUnload }: UseBeforeUnloadOptions,
) {
    const handleBeforeUnload = useCallback((event: BeforeUnloadEvent) => {
        if (when) {
            onBeforeUnload?.();

            event.preventDefault();
            (event as any).returnValue = message || '';

            return message || '';
        }
    }, [when, message, onBeforeUnload]);

    useEffect(() => {
        if (when) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        } else {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [when, handleBeforeUnload]);
}

export default function Indexing(props: {
    indexing: boolean,
    onIndexing: () => void
}) {
    const [user] = useStoredValue<{ token: string } | null>(
        config.storageKeys.cmsUser,
        null,
    );

    useBeforeUnload({
        when: props.indexing,
        message: 'You have unsaved changes. Are you sure you want to leave?',
    });

    if (!user?.token) {
        return null;
    }

    return <div
        className={
            'fixed bottom-0 flex justify-between items-center sm:gap-6 gap-2 w-screen sm:p-6 px-4 py-2 min-h-20 bg-[#EFF0F4] sm:flex-row flex-col z-[10000]'
        }
    >
        <div>
            <div className="sm:text-md text-sm">
                Натисніть <strong>Індексувати</strong> за наявності проблеми з
                відображенням дописів
            </div>
            <div className="text-red-400 sm:text-sm text-[11px]">
                <strong>Не закривайте сторінку</strong> до закінчення
                індексування
            </div>
        </div>
        <div className="flex justify-end flex-1 min-h-8 mr-2 w-full">
            { !props.indexing && <OutlinedButton
                className="border-3! sm:text-md! text-xs!"
                onClick={ props.onIndexing }
            >
                <div className="font-black uppercase">
                    Індексувати
                </div>
            </OutlinedButton> }
            { props.indexing && <div className="flex gap-2 items-center">
                <div
                    className="flex items-center justify-center"
                >
                    <SpinLoader className="w-6 h-6 border-2! border-[#EFF0F4]! border-t-[#798291]!"/>
                </div>
                <div className="font-semibold">Індексування...</div>
            </div> }
        </div>
    </div>;
}
