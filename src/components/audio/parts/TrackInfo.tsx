'use client';

import {
    useAudioPlayerContext,
} from '@/components/providers/AudioPlayerProvider';

export const TrackInfo = () => {
    const { currentTrack } = useAudioPlayerContext();

    return <div className="flex items-center gap-4">
        <div>
            <p className="font-bold lg:truncate lg:max-w-64 text-xl">
                { currentTrack?.title }
            </p>
            <p className="text-md text-[#9E9E9E]">{ currentTrack?.author }</p>
        </div>
    </div>;
};
