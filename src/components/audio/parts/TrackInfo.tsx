'use client';

import {
    useAudioPlayerContext,
} from '@/components/providers/AudioPlayerProvider';

export const TrackInfo = () => {
    const { currentTrack } = useAudioPlayerContext();

    return <div className="flex items-center gap-4 max-w-full">
        <div>
            <p
                className="font-bold lg:max-w-64 md:text-xl text-lg"
            >
                { currentTrack?.title }
            </p>
            <p
                className="md:text-md text-sm text-gray-400"
            >
                { currentTrack?.author }
            </p>
        </div>
    </div>;
};
