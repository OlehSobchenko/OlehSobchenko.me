'use client';

import { TrackInfo } from '@/components/audio/parts/TrackInfo';
import { Controls } from '@/components/audio/parts/Controls';
import { ProgressBar } from '@/components/audio/parts/ProgressBar';
import { PlayList } from '@/components/audio/parts/PlayList';
import {
    useAudioPlayerContext,
} from '@/components/providers/AudioPlayerProvider';

function PlayListButton() {
    const { setShowTracks } = useAudioPlayerContext();

    return <button
        className="cursor-pointer"
        onClick={ () => setShowTracks(prev => !prev) }
    >
        <svg
            className="w-9 h-9"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
        >
            <path
                d="M640-160q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 1.5t19 6.5v-328h200v80H760v360q0 50-35 85t-85 35ZM120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Z"
            />
        </svg>
    </button>;
}

function CloseAudioPlayerButton(props: { onClose?: () => void }) {
    if (!props.onClose) {
        return null;
    }

    return <button
        className="cursor-pointer"
        onClick={ props.onClose }
    >
        <svg
            className="w-9 h-9"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
        >
            <path
                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
            />
        </svg>
    </button>;
}

function PlayListWrapper() {
    const { showTracks } = useAudioPlayerContext();

    if (!showTracks) {
        return null;
    }

    return <div className="overflow-hidden">
        <div className="bg-(--bg-color) overflow-y-auto pb-3">
            <PlayList/>
        </div>
    </div>;
}

export const AudioPlayer = ({ onClose }: { onClose?: () => void }) => {
    return <div className="fixed bottom-0 left-0 w-full z-[10001]">
        <PlayListWrapper/>
        <div className="min-h-32 max-sm:min-h-48 flex flex-col bg-(--bg-color)">
            <ProgressBar/>
            <div
                className="flex justify-between ml-6 mr-6 sm:flex-row flex-col max-sm:gap-y-2 min-w-0"
            >
                <div className="flex max-sm:items-center items-end flex-1/3 min-w-0">
                    <div className="max-sm:block hidden flex-shrink-0">
                        <PlayListButton/>
                    </div>
                    <div className="min-w-0 flex-1">
                        <TrackInfo/>
                    </div>
                    <div className="max-sm:block hidden flex-shrink-0">
                        <CloseAudioPlayerButton onClose={ onClose }/>
                    </div>
                </div>
                <div className="flex flex-2/3">
                    <div className="flex sm:flex-1/2 flex-1 justify-center">
                        <Controls/>
                    </div>
                    <div className="relative sm:flex-1/2 flex items-center">
                        <div
                            className="absolute right-0 flex justify-end items-end sm:gap-2 sm:flex-row flex-col"
                        >
                            <div className="max-sm:hidden flex gap-x-3 items-start">
                                <PlayListButton/>
                                <CloseAudioPlayerButton onClose={ onClose }/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};
