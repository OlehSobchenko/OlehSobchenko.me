import { useState, useMemo, useRef, useEffect } from 'react';
import type { CmsWidgetControlProps } from 'decap-cms-core';
import icons from '@/components/cms/loadIcons';

interface MaterialIconWidgetProps extends CmsWidgetControlProps {
    hasActiveStyle?: boolean;
    setActiveStyle?: () => void;
    setInactiveStyle?: () => void;
}

const MaterialIconsControl = (props: MaterialIconWidgetProps) => {
    const {
        value,
        onChange,
        classNameWrapper,
        hasActiveStyle,
        setActiveStyle,
        setInactiveStyle,
    } = props as any;
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const iconEntries = useMemo(() => {
        return Object.entries(icons).map(([fileName, svg]) => {
            const name = fileName.replace('.svg', '');

            return [name, svg] as const;
        });
    }, []);

    const filteredIcons = useMemo(() => {
        if (!searchTerm) {
            return iconEntries;
        }

        const term = searchTerm.toLowerCase();
        return iconEntries.filter(([key]) => key.toLowerCase().includes(term));
    }, [searchTerm, iconEntries]);

    const getSvgFromValue = (svgString: string) => {
        if (!svgString) {
            return null;
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, 'image/svg+xml');
        const svgElement = doc.querySelector('svg');

        if (!svgElement) {
            return null;
        }

        svgElement.setAttribute('width', '40');
        svgElement.setAttribute('height', '40');

        return {
            id: svgElement.getAttribute('id') || '',
            svg: svgElement.outerHTML,
        };
    };

    const handleSelectIcon = (iconKey: string) => {
        const svg = icons[iconKey];

        if (!svg) {
            return;
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(svg, 'image/svg+xml');
        const svgElement = doc.querySelector('svg');

        if (!svgElement) {
            return;
        }

        svgElement.setAttribute('id', iconKey);
        svgElement.setAttribute('width', '40');
        svgElement.setAttribute('height', '40');

        onChange(svgElement.outerHTML);
        setIsOpen(false);
        setInactiveStyle?.();
    };

    const handleToggle = () => {
        if (isOpen) {
            setIsOpen(false);
            setInactiveStyle?.();
        } else {
            setIsOpen(true);
            setActiveStyle?.();
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setInactiveStyle?.();
    };

    const handleBackdropClick = () => {
        handleClose();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current
                && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setInactiveStyle?.();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const formatIconName = (iconKey: string) => {
        return iconKey
            .replace(/_/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());
    };

    const currentIconData = getSvgFromValue(value);
    const currentIconId = currentIconData?.id || '';
    const currentIconSvg = currentIconData?.svg || '';

    return <>
        { isOpen && <div
            style={ {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                zIndex: 999,
            } }
            onClick={ handleBackdropClick }
        /> }

        <div className={ classNameWrapper } ref={ containerRef }>
            <div style={ { position: 'relative' } }>
                <div
                    style={ {
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 12px',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                        borderColor: hasActiveStyle ? '#007acc' : '#ddd',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        cursor: 'pointer',
                        minHeight: '40px',
                    } }
                    onClick={ handleToggle }
                >
                    { currentIconId
                        ? <div style={ {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        } }>
                            <div
                                style={ { width: 40, height: 40 } }
                                dangerouslySetInnerHTML={ {
                                    __html: currentIconSvg,
                                } }
                            />
                            <span style={ { fontSize: '14px', color: '#666' } }>
                                { formatIconName(currentIconId) }
                            </span>
                        </div>
                        : <span
                            style={ { color: '#999', fontSize: '14px' } }
                        >
                            Оберіть іконку...
                        </span>
                    }
                </div>

                { isOpen && <div
                    style={ {
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: '#fff',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: '#ddd',
                        borderRadius: '4px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        zIndex: 1000,
                        maxHeight: '400px',
                        overflowY: 'auto',
                    } }
                >
                    <div
                        style={ {
                            padding: '12px',
                            borderBottomWidth: '1px',
                            borderBottomStyle: 'solid',
                            borderBottomColor: '#eee',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        } }
                    >
                        <input
                            type="text"
                            placeholder="Пошук іконок... (напр., home, search, settings)"
                            value={ searchTerm }
                            onChange={ (e) => setSearchTerm(e.target.value) }
                            style={ {
                                flex: 1,
                                padding: '8px',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: '#ddd',
                                borderRadius: '4px',
                                fontSize: '14px',
                            } }
                            autoFocus
                        />
                        <button
                            onClick={ handleClose }
                            style={ {
                                padding: '4px',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: '#ddd',
                                borderRadius: '4px',
                                backgroundColor: '#f5f5f5',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            } }
                        >
                            ✕
                        </button>
                    </div>
                    { currentIconId && <div
                        style={ {
                            padding: '16px',
                            borderBottom: '1px solid #eee',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            backgroundColor: '#f8f9fa',
                        } }
                    >
                        <div
                            style={ {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            } }
                        >
                            <div
                                style={ { width: 40, height: 40 } }
                                dangerouslySetInnerHTML={ {
                                    __html: currentIconSvg,
                            } }
                            />
                            <div>
                                <div style={ {
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    color: '#333',
                                } }>
                                    Іконка: { formatIconName(currentIconId) }
                                </div>
                                <div style={ {
                                    fontSize: '12px',
                                    color: '#666',
                                } }>{ currentIconId }</div>
                            </div>
                        </div>
                        <button
                            onClick={ () => {
                                onChange('');
                                setIsOpen(false);
                                setInactiveStyle?.();
                            } }
                            style={ {
                                padding: '4px 8px',
                                border: '1px solid #dc3545',
                                borderRadius: '4px',
                                backgroundColor: '#fff',
                                color: '#dc3545',
                                cursor: 'pointer',
                                fontSize: '12px',
                                marginLeft: 'auto',
                            } }
                        >
                            Очистити
                        </button>
                    </div> }

                    <div
                        style={ {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                            gap: '4px',
                            padding: '8px',
                        } }
                    >
                        { filteredIcons.map(([iconKey, svg]) => <div
                            key={ iconKey }
                            style={ {
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '8px',
                                cursor: 'pointer',
                                borderRadius: '4px',
                                backgroundColor: currentIconId === iconKey
                                    ? '#e3f2fd'
                                    : 'transparent',
                                border: currentIconId === iconKey
                                    ? '2px solid #2196f3'
                                    : '2px solid transparent',
                                transition: 'all 0.2s ease',
                            } }
                            onClick={ () => handleSelectIcon(iconKey) }
                        >
                            <div
                                style={ {
                                    width: 40,
                                    height: 40,
                                    marginBottom: '8px',
                                    fontWeight: 700,
                                } }
                                dangerouslySetInnerHTML={ {
                                    __html: svg as any,
                                } }
                            />
                            <span
                                style={ {
                                    fontSize: '10px',
                                    color: '#666',
                                    textAlign: 'center',
                                    wordBreak: 'break-word',
                                    lineHeight: '1.2',
                                } }
                            >
                              { formatIconName(iconKey) }
                            </span>
                        </div>) }
                    </div>

                    { filteredIcons.length === 0 && <div
                        style={ {
                            padding: '20px',
                            textAlign: 'center',
                            color: '#666',
                            fontSize: '14px',
                        } }
                    >
                        Не знайдено "{ searchTerm }"
                    </div> }
                </div> }
            </div>
        </div>
    </>;
};

export default MaterialIconsControl;
