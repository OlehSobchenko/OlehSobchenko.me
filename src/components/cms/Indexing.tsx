import OutlinedButton from '@/components/base/OutlinedButton';
import React, { useCallback, useEffect } from 'react';
import SpinLoader from '@/components/base/SpinLoader';

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
    onClick: () => void
}) {
    useBeforeUnload({
        when: props.indexing,
        message: 'You have unsaved changes. Are you sure you want to leave?',
    });

    return <div
        className={
            'sticky bottom-0 flex justify-between items-center md:gap-8 gap-4 w-screen p-6 min-h-20 bg-[#EFF0F4] md:flex-row flex-col'
        }
    >
        <div>
            <div>
                Натисніть <strong>Індексувати</strong>, наприклад, якщо
                допис не відображається у стрічці головної сторінки
            </div>
            <div className="text-red-400">
                <strong>Не закривайте сторінку</strong> до того, як закінчиться
                індексування
            </div>
        </div>
        <div className="flex justify-end flex-1 min-h-8">
            { !props.indexing && <OutlinedButton
                className="border-4!"
                onClick={ props.onClick }
            >
                <div className="font-black">ІНДЕКСУВАТИ</div>
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
