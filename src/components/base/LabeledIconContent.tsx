import { PropsWithChildren, ReactNode } from 'react';

export interface LabeledIconContentProps {
    iconContent?: ReactNode;
}

export default function LabeledIconContent(
    props: PropsWithChildren<LabeledIconContentProps>,
) {
    return <>
        <span className="uppercase sm:pl-1.5">
            { props.children }
        </span>
        { props.iconContent && <svg
            className="sm:block hidden"
            xmlns="http://www.w3.org/2000/svg"
            height="40px"
            viewBox="0 -960 960 960"
            width="40px"
        >
            { props.iconContent }
        </svg> }
    </>;
}
