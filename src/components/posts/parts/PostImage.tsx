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
        return <div className="lg:m-0 ml-[-32px] mr-[-32px] relative pt-4 pb-4">
            <img src={ imgSrc } alt="" className="w-full"/>
        </div>;
    }

    return <div className="mt-4 mb-4 flex justify-center">
        <img src={ imgSrc } alt="" className="max-w-full max-h-full"/>
    </div>;
};

export default PostImage;
