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
    }, [value]);

    useEffect(() => {
        if (!field.get('hidden')) {
            return;
        }

        const container = inputRef.current?.parentElement;

        if (container) {
            container.style.display = 'none';
        }
    }, []);

    const generateId = () => onChange(uniqueId());

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
