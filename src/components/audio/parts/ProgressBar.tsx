'use client';

import {
    useAudioPlayerContext,
} from '@/components/providers/AudioPlayerProvider';
import * as Slider from '@radix-ui/react-slider';

export const ProgressBar = () => {
    const {
        progressBarRef,
        audioRef,
        timeProgress,
        duration,
        setTimeProgress,
    } = useAudioPlayerContext();

    const handleProgressChange = (value: number[]) => {
        if (audioRef.current && progressBarRef.current) {
            const newTime = Number(value[0]);

            audioRef.current.currentTime = newTime;

            setTimeProgress(newTime);

            progressBarRef.current.style.setProperty(
                '--range-progress',
                `${ newTime / duration * 100 }%`,
            );
        }
    };

    const formatTime = (time: number | undefined): string => {
        if (typeof time === 'number' && !isNaN(time)) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);

            const formatMinutes = minutes.toString().padStart(2, '0');
            const formatSeconds = seconds.toString().padStart(2, '0');

            return `${ formatMinutes }:${ formatSeconds }`;
        }

        return '00:00';
    };

    return <div className="w-full relative audio-time-range">
        <Slider.Root
            className="absolute cursor-pointer flex items-center select-none touch-none w-full h-1.5"
            ref={ progressBarRef }
            onValueChange={ handleProgressChange }
            min={ 0 }
            max={ duration }
            value={ [timeProgress] }
        >
            <Slider.Track
                className="bg-[#9E9E9E] relative flex-grow h-full hover:outline-1 hover:outline-[#9E9E9E]"
            >
                <Slider.Range
                    className="absolute bg-(--main-color) h-full hover:outline-1 hover:outline-(--main-color)"
                />
            </Slider.Track>
            <Slider.Thumb
                className="block w-6 h-6 cursor-pointer rounded-full border-4 border-(--main-color) bg-(--bg-color) outline-none focus:outline-none focus:ring-0 focus:shadow-none"
            />
        </Slider.Root>
        <div className="flex justify-between">
            <span className="p-6 pt-5 pb-1">{ formatTime(timeProgress) }</span>
            <span className="p-6 pt-5 pb-1">{ formatTime(duration) }</span>
        </div>
    </div>;
};
