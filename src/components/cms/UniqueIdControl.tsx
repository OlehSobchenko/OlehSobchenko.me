import { CmsWidgetControlProps } from 'decap-cms-core';
import { useEffect, useRef } from 'react';
import uniqueId from '@/utils/uniqueId';

export default function UniqueIdControl(props: CmsWidgetControlProps) {
    const {
        forID,
        classNameWrapper,
        setActiveStyle,
        setInactiveStyle,
        value,
        onChange,
        field,
    } = props as any;
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!value) {
            generateId();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => {
        if (!field.get('hidden')) {
            return;
        }

        const container = inputRef.current?.parentElement;

        if (container) {
            container.style.display = 'none';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const generateId = () => {
        const id = uniqueId();

        onChange(id);
    };

    return <input
        type="text"
        className={ classNameWrapper }
        value={ value as unknown as string || '' }
        id={ forID }
        onFocus={ setActiveStyle }
        onBlur={ setInactiveStyle }
        disabled
        ref={ inputRef }
    />;
}
