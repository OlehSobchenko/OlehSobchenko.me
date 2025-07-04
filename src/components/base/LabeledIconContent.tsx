import { PropsWithChildren, ReactNode } from 'react';

export interface LabeledIconContentProps {
    iconContent?: ReactNode;
}

export default function LabeledIconContent(
    props: PropsWithChildren<LabeledIconContentProps>,
) {
    return <div className="flex sm:min-h-10 min-h-8 justify-center items-center gap-2">
        <span className="uppercase sm:pl-1.5">
            { props.children }
        </span>
        { props.iconContent && <svg
            className="sm:block hidden lg:w-10 lg:h-10 w-8 h-8 pb-0.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
        >
            { props.iconContent }
        </svg> }
    </div>;
}
