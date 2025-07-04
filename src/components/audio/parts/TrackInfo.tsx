'use client';

import {
    useAudioPlayerContext,
} from '@/components/providers/AudioPlayerProvider';
import { useLocale } from 'use-intl';

export const TrackInfo = () => {
    const locale = useLocale();
    const { currentTrack } = useAudioPlayerContext();
    const metadata = (currentTrack?.locales || {})[locale];

    return <div className="flex items-center gap-4 max-w-full">
        <div className="max-sm:flex gap-x-1.5">
            <p
                className="font-bold lg:max-w-64 md:text-xl text-lg"
            >
                { metadata?.name }
            </p>
            <div className="sm:hidden block text-lg"> | </div>
            <p
                className="md:text-md text-lg text-gray-400"
            >
                { metadata?.description }
            </p>
        </div>
    </div>;
};
