'use client';

import {
    createContext,
    useContext,
    useState,
    Dispatch,
    SetStateAction,
    RefObject,
    useRef,
    PropsWithChildren,
} from 'react';
import forest from '@/data/forest.mp3';

export interface Track {
    title: string;
    src: string;
    author: string;
    thumbnail?: string;
}

interface AudioPlayerContextType {
    currentTrack: Track | null;
    setCurrentTrack: Dispatch<SetStateAction<Track | null>>;
    timeProgress: number;
    setTimeProgress: Dispatch<SetStateAction<number>>;
    duration: number;
    setDuration: Dispatch<SetStateAction<number>>;
    audioRef: RefObject<HTMLAudioElement | null>;
    progressBarRef: RefObject<HTMLInputElement | null>;
    playing: boolean;
    setPlaying: Dispatch<SetStateAction<boolean>>;
    tracks: Track[];
    setTracks: Dispatch<SetStateAction<Track[]>>;
    showTracks: boolean;
    setShowTracks: Dispatch<SetStateAction<boolean>>;
}

export const AudioPlayerContext = createContext<
    AudioPlayerContextType | undefined
>(undefined);

export const AudioPlayerProvider = (
    { children }: PropsWithChildren,
) => {
    const [currentTrack, setCurrentTrack] = useState<Track | null>({
        title: 'Forest Lullaby',
        src: forest,
        author: 'Composer',
    });
    const [timeProgress, setTimeProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [playing, setPlaying] = useState<boolean>(false);
    const [showTracks, setShowTracks] = useState<boolean>(false);
    const [tracks, setTracks] = useState<Track[]>([
        {
            title: 'Forest Lullaby',
            src: forest,
            author: 'Composer',
        },
    ]);

    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);

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

    if (context === undefined) {
        throw new Error(
            'useAudioPlayerContext must be used within an AudioPlayerProvider',
        );
    }

    return context;
};
