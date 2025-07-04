
'use client';
import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface ModalProps {
    open: boolean;
    onClose?: () => void;
    title: string | ReactNode;
    children?: ReactNode;
}

export default function Modal(props: PropsWithChildren<ModalProps>) {
    const router = useRouter();
    const { open, onClose = () => router.push('/'), title, children } = props;

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

    return <div
        className="fixed inset-0 z-[10000] bg-[var(--bg-color)] flex flex-col w-full mx-auto"
    >
        <div className="flex-shrink-0 max-w-[1024px] ml-auto mr-auto w-full">
            <div
                className="lg:pt-16 pt-6 lg:pl-16 pl-6 lg:pr-16 pr-6 lg:px-32 px-6 flex justify-between items-center"
            >
                <div
                    className="uppercase lg:text-5xl text-4xl overflow-hidden whitespace-nowrap text-ellipsis mr-[30px] pt-1"
                >
                    { title }
                </div>
                <button onClick={ onClose } className="cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="48"
                        viewBox="0 -960 960 960"
                        width="48"
                    >
                        <path d="m248.13-189.91-57.78-58.22L422.22-480 190.35-711.74l57.78-58.78 232.3 231.74 231.44-231.74 57.78 58.78L538.78-480l230.87 231.87-57.78 58.22-231.44-231.74-232.3 231.74Z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div className="flex-1 w-full overflow-y-auto lg:mt-6 mt-4">
            <div className="max-w-[1024px] ml-auto mr-auto">
                <div className="modal-content lg:pl-16 pl-6 lg:pr-16 pr-6">
                    { children }
                </div>
            </div>
        </div>
    </div>;
}
