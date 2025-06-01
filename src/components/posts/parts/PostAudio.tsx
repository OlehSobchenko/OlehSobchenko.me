import React from 'react';
import { Post } from '@/components/posts/types';
import { Languages } from '@/i18n/config';
import getLocalized from '@/utils/getLocalized';

const PostAudio: React.FC<{
    audio?: Post['audio'];
    lang: Languages;
}> = ({ audio, lang }) => {
    if (!audio) {
        return null;
    }

    return <div className="flex items-center py-4 cursor-pointer">
        <div className="mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" height="48px"
                 viewBox="0 0 24 24" width="48px">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
        </div>
        { (
            audio.name || audio.description
        ) && <div
            className="flex flex-col justify-between gap-0.5"
        >
            { audio.name && <div
                className="text-lg">
                { getLocalized(audio.name, lang)?.toUpperCase() }
            </div> }
            { audio.description && <div
                className="text-base">
                { getLocalized(audio.description, lang) }
            </div> }
        </div> }
    </div>;
};

export default PostAudio;
