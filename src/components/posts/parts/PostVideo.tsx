'use client';
import React from 'react';
import parse, {
    HTMLReactParserOptions,
    attributesToProps,
} from 'html-react-parser';
import PersistentIframe from '@/components/base/PersistentIframe';

interface HtmlParserProps {
    htmlString: string;
}

function HtmlParser({ htmlString }: HtmlParserProps) {
    const options: HTMLReactParserOptions = {
        replace: (domNode: any) => {
            if (domNode) {
                const reactProps = attributesToProps(domNode.attribs);

                if (domNode.name === 'iframe') {
                    return <PersistentIframe {...reactProps} />;
                }
            }

            return domNode;
        },
    };

    return <>{ parse(htmlString, options) }</>;
}

const VideoContent = (
    { video }: {
        video: {
            link?: string;
            embed?: string;
        };
    },
) => {
    if (video.embed) {
        return <div><HtmlParser htmlString={ video.embed }/></div>;
    }

    return <video
        onClick={ e => {
            e.stopPropagation();
        } }
        src={ video.link }
        controls
        className="absolute top-0 left-0 w-full h-full"
    />;
};

const PostVideo = ({ video }: {
    video?: {
        link?: string;
        embed?: string;
    };
}) => {
    if (!video || (!video.link && !video.embed)) {
        return null;
    }

    return <div className="py-4 lg:m-0 ml-[-34px] mr-[-34px]">
        <div className="video-wrapper relative pb-[56.25%] h-0">
            <VideoContent video={ video }/>
        </div>
    </div>;
};

export default PostVideo;
