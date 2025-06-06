'use client';

import { TrackInfo } from '@/components/audio/parts/TrackInfo';
import { Controls } from '@/components/audio/parts/Controls';
import { ProgressBar } from '@/components/audio/parts/ProgressBar';
import { PlayList } from '@/components/audio/parts/PlayList';
import {
    useAudioPlayerContext,
} from '@/components/providers/AudioPlayerProvider';

export const AudioPlayer = ({ onClose }: { onClose?: () => void }) => {
    const { setShowTracks, showTracks } = useAudioPlayerContext();

    return <div className="fixed bottom-0 left-0 w-full">
        { showTracks && <div
            className="transition-max-height duration-300 ease-in-out overflow-hidden"
        >
            <div className="bg-(--bg-color) max-h-72 overflow-y-auto pb-3">
                <PlayList/>
            </div>
        </div> }
        <div className="min-h-32 flex flex-col bg-(--bg-color)">
            <ProgressBar/>
            <div
                className="flex justify-between lg:ml-16 lg:mr-16 md:ml-6 md:mr-6 ml-3 mr-3 sm:flex-row flex-col"
            >
                <div className="flex-1/3">
                    <TrackInfo/>
                </div>
                <div
                    className="flex flex-2/3"
                >
                    <div className="flex sm:flex-1/2 flex-1 justify-center">
                        <Controls/>
                    </div>
                    <div className="relative sm:flex-1/2 flex items-center">
                        <div
                            className="absolute right-0 flex justify-end items-end sm:gap-2 sm:flex-row flex-col"
                        >
                            <button
                                className="cursor-pointer"
                                onClick={ () => setShowTracks(prev => !prev) }
                            >
                                <svg
                                    className="md:w-9 md:h-9 w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 -960 960 960"
                                >
                                    <path
                                        d="M640-160q-50 0-85-35t-35-85q0-50 35-85t85-35q11 0 21 1.5t19 6.5v-328h200v80H760v360q0 50-35 85t-85 35ZM120-320v-80h320v80H120Zm0-160v-80h480v80H120Zm0-160v-80h480v80H120Z"
                                    />
                                </svg>
                            </button>
                            { onClose && <button
                                className="cursor-pointer"
                                onClick={ onClose }
                            >
                                <svg
                                    className="md:w-9 md:h-9 w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 -960 960 960"
                                >
                                    <path
                                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                                    />
                                </svg>
                            </button> }
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
};