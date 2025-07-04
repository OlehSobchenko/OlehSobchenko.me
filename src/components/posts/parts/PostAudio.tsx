import { Audio } from '@/types';
import { Languages } from '@/i18n/config';
import {
    useAudioPlayerContext,
} from '@/components/providers/AudioPlayerProvider';
import { SyntheticEvent, useCallback } from 'react';

const PostAudio = (
    { audio, lang }: { audio?: Audio; lang: Languages },
) => {
    const {
        currentTrack,
        setCurrentTrack,
        setPlaying,
        playing,
    } = useAudioPlayerContext();
    const isCurrentTrack = currentTrack?.id
        ? currentTrack?.id === audio?.id
        : false
    ;
    const isCurrentTrackPlaying = isCurrentTrack && playing;

    const handleClick = useCallback((event: SyntheticEvent) => {
        event.preventDefault();
        event.stopPropagation();

        if (isCurrentTrack) {
            setPlaying(previous => !previous);

            return;
        }

        if (audio) {
            setCurrentTrack(audio);
            setPlaying(true);
        }
    }, [isCurrentTrack]);

    if (!audio) {
        return null;
    }

    const locales = audio.locales || {};
    const metadata = locales[lang];

    return <div className="flex items-center py-4 cursor-pointer">
        <div className="mr-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 0 24 24"
                width="48px"
                onClick={ handleClick }
            >
                { isCurrentTrackPlaying && <>
                    <g>
                        <rect fill="none" height="24" width="24"/>
                        <rect fill="none" height="24" width="24"/>
                        <rect fill="none" height="24" width="24"/>
                    </g>
                    <g>
                        <g/>
                        <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M11,16H9V8h2V16z M15,16h-2V8h2V16z"/>
                    </g>
                </> }
                { !isCurrentTrackPlaying && <>
                    <path d="M0 0h24v24H0V0z" fill="none"/>
                    <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"
                    />
                </> }
            </svg>
        </div>
        { metadata && <div className="flex flex-col justify-between gap-0.5">
            { metadata.name && <div className="text-lg uppercase">
                { metadata.name }
            </div> }
            { metadata.description && <div className="text-base">
                { metadata.description }
            </div> }
        </div> }
    </div>;
};

export default PostAudio;
