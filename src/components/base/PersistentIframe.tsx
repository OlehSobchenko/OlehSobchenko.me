import { DetailedHTMLProps, IframeHTMLAttributes, useState } from 'react';

export type PersistentIframeProps = DetailedHTMLProps<
    IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
>;

export default function PersistentIframe(props: PersistentIframeProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return <iframe
        { ...props }
        onLoad={ (...args) => {
            setIsLoaded(true);
            props.onLoad?.(...args);
        } }
        style={{
            display: isLoaded ? 'block' : 'none',
            ...props.style || {},
        }}
    />;
}
