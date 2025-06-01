'use client';

import { useState } from 'react';

export default function AudioControl() {
    const [playing, setPlaying] = useState(false);

    const handlePlay = () => {
        setPlaying(prev => !prev);
    };

    return <>
        <div
            className={
                `cursor-pointer mt-8 lg:fixed lg:right-16 lg:bottom-16 ${
                    playing ? 'lg:hidden' : '' }`
            }
            onClick={ handlePlay }
        >
            <svg
                className="lg:w-20 lg:h-20 w-12 h-12"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
            >
                <path
                    style={{
                        fill: 'var(--bg-color)',
                    }}
                    d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"
                />
                { playing
                    ? <path d="M360-320h80v-320h-80v320Zm160 0h80v-320h-80v320ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
                    : <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
                }
            </svg>
        </div>
    </>;
}
