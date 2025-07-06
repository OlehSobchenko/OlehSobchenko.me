'use client';

import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@/utils/hooks/useMediaQuery';

export interface ModalProps {
    open: boolean;
    onClose?: () => void;
    title: string | ReactNode;
    children?: ReactNode;
}

export default function Modal(props: PropsWithChildren<ModalProps>) {
    const router = useRouter();
    const { open, onClose = () => router.push('/'), title, children } = props;
    const full = useMediaQuery('(min-width: 1024px)');

    useEffect(() => {
        if (open) {
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = 'auto';
        }
    }, [open]);

    if (!open) {
        return null;
    }

    const header = typeof title === 'string'
        ? <div
            title={ title }
            className="uppercase lg:text-5xl text-4xl overflow-hidden whitespace-nowrap text-ellipsis mr-2 pt-1"
        >
            { title }
        </div>
        : title
    ;

    return <div
        className="fixed inset-0 z-[10000] bg-[var(--bg-color)] flex flex-col w-full mx-auto lg:gap-6 gap-4"
    >
        <div className="flex-shrink-0 max-w-[1024px] ml-auto mr-auto w-full">
            <div
                className="lg:pt-16 pt-6 px-(--page-indent) flex justify-between items-center gap-1"
            >
                { header }
                <button onClick={ onClose } className="cursor-pointer">
                    <svg
                        className="sm:w-12 sm:h-12 w-10 h-10"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                    >
                        <path d="m248.13-189.91-57.78-58.22L422.22-480 190.35-711.74l57.78-58.78 232.3 231.74 231.44-231.74 57.78 58.78L538.78-480l230.87 231.87-57.78 58.22-231.44-231.74-232.3 231.74Z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div
            className="flex-1 w-full overflow-y-auto"
            style={ full ? {} : {
                scrollbarGutter: 'stable both-edges',
                scrollbarWidth: 'none',
                scrollbarColor: 'rgba(0, 0, 0, 0.3) transparent',
            } }
        >
            <div className="max-w-[1024px] ml-auto mr-auto">
                <div className="px-(--page-indent)">
                    { children }
                </div>
            </div>
        </div>
    </div>;
}
