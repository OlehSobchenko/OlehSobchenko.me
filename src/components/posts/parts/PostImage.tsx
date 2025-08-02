import React from 'react';

const PostImage = ({ image, short }: {
    image?: string;
    short: boolean;
}) => {
    if (!image) {
        return null;
    }

    const imgSrc = image;

    if (!imgSrc) {
        return null;
    }

    if (short) {
        return <div className="post-image lg:m-0 relative pt-4 pb-4">
            <img src={ imgSrc } alt="" className="w-full"/>
        </div>;
    }

    return <div className="post-image mb-4 flex justify-center">
        <img src={ imgSrc } alt="" className="w-full max-h-full"/>
    </div>;
};

export default PostImage;
