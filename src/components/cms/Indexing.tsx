import OutlinedButton from '@/components/base/OutlinedButton';
import { useCallback, useEffect } from 'react';

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
            event.returnValue = message || '';

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
        onBeforeUnload: () => {
            console.log('User attempted to leave with unsaved changes');
        },
    });

    return <div
        className={
            'flex justify-between items-center gap-8 w-screen p-6 min-h-20'
        }
    >
        <div>
            Натисніть <strong>Індексувати</strong>, наприклад, якщо
            допис не відображається у стрічці головної сторінки
        </div>
        <div className="flex justify-end flex-1">
            { !props.indexing && <OutlinedButton
                className="border-4!"
                onClick={ props.onClick }
            >
                <div className="font-black">ІНДЕКСУВАТИ</div>
            </OutlinedButton> }
            { props.indexing && <div>Ідексування...</div> }
        </div>
    </div>;
}
