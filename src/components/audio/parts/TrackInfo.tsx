'use client';

import {
    useAudioPlayerContext,
} from '@/components/providers/AudioPlayerProvider';
import { useLocale } from 'next-intl';

export const TrackInfo = () => {
    const locale = useLocale();
    const { currentTrack } = useAudioPlayerContext();
    const metadata = (currentTrack?.locales || {})[locale];

    return <div className="flex items-center gap-4 max-sm:w-full">
        <div className="max-sm:flex max-sm:flex-col max-sm:items-center max-sm:w-full">
            <p
                className="max-sm:text-center font-bold max-sm:text-2xl lg:max-w-64 md:text-2xl text-lg leading-6"
            >
                { metadata?.name }
            </p>
            <p
                className="max-sm:text-center md:text-md text-lg text-gray-400"
            >
                { metadata?.description }
            </p>
        </div>
    </div>;
};
