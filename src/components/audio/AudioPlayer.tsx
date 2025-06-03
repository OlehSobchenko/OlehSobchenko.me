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
            <div
                className="bg-(--bg-color) max-h-72 overflow-y-auto pb-3"
            >
                <PlayList/>
            </div>
        </div> }

        <div
            className="h-30 flex flex-col bg-(--bg-color)"
        >
            <ProgressBar/>
            <div className="flex lg:ml-16 lg:mr-16 ml-6 mr-6">
                <TrackInfo/>
                <div
                    className="flex flex-col items-center gap-1 m-auto"
                >
                    <Controls/>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="cursor-pointer"
                        onClick={ () => setShowTracks(prev => !prev) }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="36px"
                            viewBox="0 -960 960 960"
                            width="36px"
                        >
                            <path
                                d="M120-320v-80h280v80H120Zm0-160v-80h440v80H120Zm0-160v-80h440v80H120Zm520 480v-160H480v-80h160v-160h80v160h160v80H720v160h-80Z"
                            />
                        </svg>
                    </button>
                    { onClose && <button
                        className="cursor-pointer"
                        onClick={ onClose }
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="36px"
                            viewBox="0 -960 960 960"
                            width="36px"
                        >
                            <path
                                d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                            />
                        </svg>
                    </button> }
                </div>
            </div>
        </div>
    </div>;
};