const getVideoContent = (video: {
    link?: string;
    embed?: string;
}) => {
    if (video.embed) {
        return <div dangerouslySetInnerHTML={ { __html: video.embed } }/>;
    }

    return <video
        src={ video.link }
        controls
        className="absolute top-0 left-0 w-full h-full"
    />;
};

const PostVideo = ({ video, short }: {
    video?: {
        link?: string;
        embed?: string;
    };
    short: boolean;
}) => {
    if (!video || (!video.link && !video.embed)) {
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
            { getVideoContent(video) }
        </div>
    </div>;
};

export default PostVideo;
