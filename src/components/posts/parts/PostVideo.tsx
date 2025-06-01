import React from 'react';
import { Post } from '@/components/posts/types';
import { Languages } from '@/i18n/config';
import getLocalized from '@/utils/getLocalized';

const getVideoContent = (
    video: NonNullable<Post['video']>,
    lang: Languages,
) => {
    if (video.link && !video.data) {
        const videoSrc = getLocalized(video.link.localization, lang)
            || video.link.common;

        return <video
            src={ videoSrc }
            controls
            className="absolute top-0 left-0 w-full h-full"
        />;
    }

    if (video.data) {
        return <div dangerouslySetInnerHTML={ { __html: video.data } }/>;
    }

    return null;
};

const PostVideo: React.FC<{
    video?: Post['video'];
    lang: Languages;
    short: boolean;
}> = ({ video, lang, short }) => {
    if (!video || (!video.link && !video.data)) {
        return null;
    }

    const content = getVideoContent(video, lang);

    if (!content) {
        return null;
    }

    return <div
        className={
            short
                ? 'py-4 lg:m-0 ml-[-34px] mr-[-34px]'
                : 'py-4 lg:m-0 lg:ml-[-64px] lg:mr-[-64px] ml-[-34px] mr-[-34px]'
        }
    >
        <div className="video-wrapper relative pb-[56.25%] h-0">
            { content }
        </div>
    </div>;
};

export default PostVideo;
