'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
    useAudioPlayerContext,
} from '@/components/providers/AudioPlayerProvider';

export const Controls = () => {
    const {
        currentTrack,
        audioRef,
        setDuration,
        duration,
        setTimeProgress,
        progressBarRef,
        setCurrentTrack,
        playing,
        setPlaying,
        tracks,
    } = useAudioPlayerContext();

    const playAnimationRef = useRef<number | null>(null);

    const updateProgress = useCallback(() => {
        if (audioRef.current && progressBarRef.current && duration) {
            const currentTime = audioRef.current.currentTime;

            setTimeProgress(currentTime);

            progressBarRef.current.value = currentTime.toString();
            progressBarRef.current.style.setProperty(
                '--range-progress',
                `${ currentTime / duration * 100 }%`,
            );
        }
    }, [duration, setTimeProgress, audioRef, progressBarRef]);

    const startAnimation = useCallback(() => {
        if (audioRef.current && progressBarRef.current && duration) {
            const animate = () => {
                updateProgress();
                playAnimationRef.current = requestAnimationFrame(animate);
            };
            playAnimationRef.current = requestAnimationFrame(animate);
        }
    }, [updateProgress, duration, audioRef, progressBarRef]);

    useEffect(() => {
        if (playing) {
            audioRef.current?.play().then();
            startAnimation();
        } else {
            audioRef.current?.pause();

            if (playAnimationRef.current !== null) {
                cancelAnimationFrame(playAnimationRef.current);
                playAnimationRef.current = null;
            }

            updateProgress();
        }

        return () => {
            if (playAnimationRef.current !== null) {
                cancelAnimationFrame(playAnimationRef.current);
            }
        };
    }, [playing, startAnimation, updateProgress, audioRef]);

    const onLoadedMetadata = () => {
        const seconds = audioRef.current?.duration;

        if (seconds !== undefined) {
            setDuration(seconds);

            if (progressBarRef.current) {
                progressBarRef.current.max = seconds.toString();
            }
        }
    };

    const handlePrevious = useCallback(() => {
        setCurrentTrack(prev => {
            const trackIndex = prev
                ? tracks.findIndex(
                    track => track.id === prev?.id,
                )
                : -1
            ;

            if (trackIndex === -1) {
                return prev;
            }

            const newIndex = trackIndex === 0
                ? tracks.length - 1
                : trackIndex - 1
            ;

            return tracks[newIndex];
        });
    }, [setCurrentTrack, tracks]);

    const handleNext = useCallback(() => {
        setCurrentTrack(prev => {
            const trackIndex = prev
                ? tracks.findIndex(
                    track => track.id === prev?.id,
                )
                : -1
            ;

            if (trackIndex === -1) {
                return prev;
            }

            const newIndex = trackIndex === tracks.length - 1
                ? 0
                : trackIndex + 1
            ;

            return tracks[newIndex];
        });
    }, [setCurrentTrack, tracks]);

    return <div className="flex gap-4 items-center">
        <audio
            src={ currentTrack?.link }
            ref={ audioRef }
            onLoadedMetadata={ onLoadedMetadata }
        />
        <button onClick={ handlePrevious } className="cursor-pointer">
            <svg
                className="md:w-8 md:h-8 w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
            >
                <path
                    d="M860-240 500-480l360-240v480Zm-400 0L100-480l360-240v480Zm-80-240Zm400 0Zm-400 90v-180l-136 90 136 90Zm400 0v-180l-136 90 136 90Z"
                />
            </svg>
        </button>
        <button
            onClick={ () => setPlaying(prev => !prev) }
            className="cursor-pointer"
        >
            { playing
                ? <svg
                    className="md:w-16 md:h-16 w-12 h-12"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                >
                    <path
                        d="M520-200v-560h240v560H520Zm-320 0v-560h240v560H200Zm400-80h80v-400h-80v400Zm-320 0h80v-400h-80v400Zm0-400v400-400Zm320 0v400-400Z"
                    />
                </svg>
                : <svg
                    className="md:w-16 md:h-16 w-12 h-12"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                >
                    <path
                        d="M320-200v-560l440 280-440 280Zm80-280Zm0 134 210-134-210-134v268Z"
                    />
                </svg>
            }
        </button>
        <button onClick={ handleNext } className="cursor-pointer">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
            >
                <path
                    d="M100-240v-480l360 240-360 240Zm400 0v-480l360 240-360 240ZM180-480Zm400 0Zm-400 90 136-90-136-90v180Zm400 0 136-90-136-90v180Z"
                />
            </svg>
        </button>
    </div>;
};
