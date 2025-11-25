'use client';

import {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
    PropsWithChildren,
    Dispatch,
    SetStateAction,
    RefObject,
} from 'react';
import { Audio } from '@/types';
import enrichAudio from '@/utils/data/enrichAudio';
import getIndexedEntries from '@/utils/data/getIndexedEntries';

interface AudioPlayerContextType {
    currentTrack: Audio | null;
    setCurrentTrack: Dispatch<SetStateAction<Audio | null>>;
    timeProgress: number;
    setTimeProgress: Dispatch<SetStateAction<number>>;
    duration: number;
    setDuration: Dispatch<SetStateAction<number>>;
    audioRef: RefObject<HTMLAudioElement | null>;
    progressBarRef: RefObject<HTMLInputElement | null>;
    playing: boolean;
    setPlaying: Dispatch<SetStateAction<boolean>>;
    tracks: Audio[];
    setTracks: Dispatch<SetStateAction<Audio[]>>;
    showTracks: boolean;
    setShowTracks: Dispatch<SetStateAction<boolean>>;
}

export const AudioPlayerContext = createContext<
    AudioPlayerContextType | undefined
>(undefined);

export const AudioPlayerProvider = (
    { children }: PropsWithChildren,
) => {
    const [currentTrack, setCurrentTrack] = useState<Audio | null>(null);
    const [timeProgress, setTimeProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [playing, setPlaying] = useState<boolean>(false);
    const [showTracks, setShowTracks] = useState<boolean>(false);
    const [tracks, setTracks] = useState<Audio[]>([]);

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getIndexedEntries<Audio[]>('audios').then(loadedTracks => {
            if (!loadedTracks?.length) {
                return;
            }

            const enrichedTracks = loadedTracks
                .map(enrichAudio)
                .toSorted(
                    (a, b) =>
                        +(b?.priority || Infinity) -
                        +(a?.priority || Infinity));

            setTracks(enrichedTracks as Audio[]);

            const track = enrichedTracks[0];

            if (track) {
                setCurrentTrack(track);
            }
        });
    }, []);

    return <AudioPlayerContext.Provider
        value={ {
            currentTrack,
            setCurrentTrack,
            audioRef,
            progressBarRef,
            timeProgress,
            setTimeProgress,
            duration,
            setDuration,
            playing,
            setPlaying,
            tracks,
            setTracks,
            showTracks,
            setShowTracks,
        } }
    >
        { children }
    </AudioPlayerContext.Provider>;
};

export const useAudioPlayerContext = (): AudioPlayerContextType => {
    const context = useContext(AudioPlayerContext);

    return context || {} as AudioPlayerContextType;
};
