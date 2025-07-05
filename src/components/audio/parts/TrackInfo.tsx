'use client';

import {
    useAudioPlayerContext,
} from '@/components/providers/AudioPlayerProvider';
import { useLocale } from 'next-intl';

export const TrackInfo = () => {
    const locale = useLocale();
    const { currentTrack } = useAudioPlayerContext();
    const metadata = (currentTrack?.locales || {})[locale];

    return <div className="flex items-center gap-4 max-sm:w-full min-w-0">
        <div className="max-sm:flex max-sm:flex-col max-sm:items-center max-sm:w-full min-w-0 flex-1 max-sm:pr-2 max-sm:pl-2">
            <p
                title={ metadata?.name }
                className="max-sm:text-center font-bold max-sm:text-2xl lg:max-w-64 md:text-2xl text-lg leading-6 overflow-hidden text-ellipsis whitespace-nowrap min-w-0 w-full"
            >
                { metadata?.name }
            </p>
            <p
                title={ metadata?.description }
                className="max-sm:text-center md:text-md text-lg text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap min-w-0 w-full"
            >
                { metadata?.description }
            </p>
        </div>
    </div>;
};
