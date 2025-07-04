import { Audio } from '@/types';
import normalizeUrl from '@/utils/data/normalizeUrl';

export default function enrichAudio(audio?: Audio): Audio | undefined {
    return audio
        ? {
            ...audio,
            link: normalizeUrl(audio.link),
        }
        : audio
    ;
}
