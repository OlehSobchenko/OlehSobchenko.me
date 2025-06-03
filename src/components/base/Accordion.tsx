import { PropsWithChildren, ReactNode, useState } from 'react';
import classNames from '@/utils/classNames';

export interface AccordionProps extends PropsWithChildren {
    title: ReactNode;
    titleClassName?: string;
}

export default function Accordion(props: AccordionProps) {
    const [open, setOpen] = useState(false);

    return <div className="w-full">
        <div
            onClick={ () => setOpen(prev => !prev) }
            className="flex items-center w-full cursor-pointer select-none gap-2 mb-3"
        >
            <span
                className={ classNames(
                    'font-bold lg:text-5xl text-3xl',
                    props.titleClassName,
                ) }
            >
                { props.title }
            </span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                className={ classNames(
                    'transition-transform duration-300',
                    open ? 'rotate-[270deg]' : 'rotate-90',
                ) }
            >
                <path
                    d="M304-68.43 234.43-139l343-343-343-343L304-895.57 717.57-482 304-68.43Z"
                />
            </svg>
        </div>
        <div
            className={
                `transition-all duration-300 ease-in-out overflow-hidden ${
                    open ? 'opacity-100' : 'opacity-0'
                }`
            }
        >
            { open && props.children }
        </div>
    </div>;
}
