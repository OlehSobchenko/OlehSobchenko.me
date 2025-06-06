'use client';

import {
    useAudioPlayerContext,
} from '@/components/providers/AudioPlayerProvider';

export const TrackInfo = () => {
    const { currentTrack } = useAudioPlayerContext();

    return <div className="flex items-center gap-4 max-w-full">
        <div className="max-sm:flex gap-x-1.5">
            <p
                className="font-bold lg:max-w-64 md:text-xl text-lg"
            >
                { currentTrack?.title }
            </p>
            <div className="sm:hidden block text-lg"> | </div>
            <p
                className="md:text-md text-lg text-gray-400"
            >
                { currentTrack?.author }
            </p>
        </div>
    </div>;
};
