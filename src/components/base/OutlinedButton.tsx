import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classNames from '@/utils/classNames';

export type OutlinedButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export default function OutlinedButton(
    { children, ...props }: OutlinedButtonProps,
) {
    return <button
        { ...props }
        className={ classNames(
            'flex border-color-(main-color) lg:border-[6px] border-[4px] pl-2.5 pr-2.5 gap-2.5 items-center cursor-pointer',
            props.className,
        ) }
    >
        { children }
    </button>;
}
