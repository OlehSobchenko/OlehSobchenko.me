'use client';

import {
    useAudioPlayerContext,
} from '@/components/providers/AudioPlayerProvider';
import { Audio } from '@/types';
import { useLocale } from 'next-intl';
import { Languages } from '@/i18n/config';

export const PlayList = () => {
    const locale = useLocale() as Languages;
    const {
        currentTrack,
        setCurrentTrack,
        setPlaying,
        tracks,
    } = useAudioPlayerContext();

    const handleClick = (track: Audio) => {
        setCurrentTrack(track);
        setPlaying(true);
    };

    return <ul className="max-h-80 overflow-y-auto">
        { tracks.map((track, index) => (
            <li
                key={ index }
                className="flex items-center gap-3 justify-between p-[0.5rem_10px] cursor-pointer"
                tabIndex={ 0 }
                onKeyDown={ (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleClick(track);
                    }
                } }
                onClick={ () => handleClick(track) }
            >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                        className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-sm overflow-hidden"
                    >
                        { track.thumbnail
                            ? <img
                                className="w-full h-full object-cover"
                                src={ track.thumbnail }
                                alt="audio avatar"
                            />
                            : <div
                                className="flex items-center justify-center w-full h-full bg-(--main-color)"
                            >
                                <span className="text-xl">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        height="24px"
                                        viewBox="0 -960 960 960"
                                        width="24px"
                                        className="fill-(--bg-color)"
                                    >
                                        <path
                                            d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 42.5 5.5T480-418v-422h240v160H560v400q0 66-47 113t-113 47Z"
                                        />
                                    </svg>
                                </span>
                            </div> }
                    </div>
                    <div className="min-w-0 flex-1">
                        <p
                            title={ (track.locales || {})[locale]?.name }
                            className="font-bold text-lg overflow-hidden whitespace-nowrap text-ellipsis"
                        >
                            { (track.locales || {})[locale]?.name }
                        </p>
                        <p
                            title={ (track.locales || {})[locale]?.description }
                            className="text-sm text-gray-400 overflow-hidden whitespace-nowrap text-ellipsis"
                        >
                            { (track.locales || {})[locale]?.description }
                        </p>
                    </div>
                </div>
                <div className="flex-shrink-0">
                    { track?.id === currentTrack?.id && <div className="p-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                        >
                            <path
                                d="M197-197q-54-55-85.5-127.5T80-480q0-84 31.5-156.5T197-763l57 57q-44 44-69 102t-25 124q0 67 25 125t69 101l-57 57Zm113-113q-32-33-51-76.5T240-480q0-51 19-94.5t51-75.5l57 57q-22 22-34.5 51T320-480q0 33 12.5 62t34.5 51l-57 57Zm170-90q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm170 90-57-57q22-22 34.5-51t12.5-62q0-33-12.5-62T593-593l57-57q32 32 51 75.5t19 94.5q0 50-19 93.5T650-310Zm113 113-57-57q44-44 69-102t25-124q0-67-25-125t-69-101l57-57q54 54 85.5 126.5T880-480q0 83-31.5 155.5T763-197Z"/>
                        </svg>
                    </div> }
                </div>
            </li>
        )) }
    </ul>;
};
