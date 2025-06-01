import { PropsWithChildren } from 'react';

export default function PersonName({ children }: PropsWithChildren) {
    return <div className="person-name-wrapper">
        <span className="uppercase person-name">
            { children }
        </span>
    </div>;
}
