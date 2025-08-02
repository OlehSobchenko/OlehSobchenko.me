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
            className="flex items-center w-full cursor-pointer select-none gap-2 mb-1"
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
                    d="M309.67-54.67 222-143l338.33-338.33L222-819.67 309.67-908l426.66 426.67L309.67-54.67Z"
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
            { open && <div className="pt-3 pb-1">{ props.children }</div> }
        </div>
    </div>;
}
