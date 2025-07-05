'use client';

import {
    useAudioPlayerContext,
} from '@/components/providers/AudioPlayerProvider';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import { useEffect, useState } from 'react';

export default function AudioControl() {
    const { playing, setPlaying } = useAudioPlayerContext();
    const [openDrawer, setOpenDrawer] = useState(false);

    useEffect(() => {
        if (!openDrawer && playing) {
            setOpenDrawer(true);
        }
    }, [playing]);

    useEffect(() => {
        if (!openDrawer) {
            setPlaying(false);
        }
    }, [openDrawer]);

    const handlePlay = () => {
        setPlaying(prev => !prev);
    };

    return <>
        <div
            className={
                `cursor-pointer mt-8 fixed lg:right-16 lg:bottom-16 sm:right-8 sm:bottom-8 right-6 bottom-6 ${
                    openDrawer ? 'hidden' : '' }`
            }
            onClick={ handlePlay }
        >
            <svg
                className="audio-play-button lg:w-20 lg:h-20 w-18 h-18"
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
        { openDrawer && <AudioPlayer onClose={ () => setOpenDrawer(false) }/> }
    </>;
}
