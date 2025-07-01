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

    return <div className="relative mt-4 mb-4 flex justify-center">
        <img src={ imgSrc } alt="" className="absolute top-0 left-0 w-full [height:calc(100%-32px)] object-cover blur-[20px] scale-x-[1.1] z-[1]"/>
        <img src={ imgSrc } alt="" className="relative z-[2] max-w-full max-h-full object-contain bottom-4"/>
    </div>;
};

export default PostImage;
