'use client';

import React from 'react';
import { Post } from '@/components/posts/types';
import getLocalized from '@/utils/getLocalized';
import { Languages } from '@/i18n/config';
import PostHeaderIcon from '@/components/posts/parts/PostHeaderIcon';
import PostHeaderTitle from '@/components/posts/parts/PostHeaderTitle';
import PostDate from '@/components/posts/parts/PostDate';
import PostImage from '@/components/posts/parts/PostImage';
import PostVideo from '@/components/posts/parts/PostVideo';
import PostTitle from '@/components/posts/parts/PostTitle';
import PostDescription from '@/components/posts/parts/PostDescription';
import PostAudio from '@/components/posts/parts/PostAudio';
import PostQuote from '@/components/posts/parts/PostQuote';
import PostLink from '@/components/posts/parts/PostLink';
import PostOpenFull from '@/components/posts/parts/PostOpenFull';

interface PostCardProps {
    post: Post;
    lang: Languages;
    short?: boolean;
    fullImage?: boolean;
    onOpenFull?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = props => {
    const { post, lang, short = true, fullImage = false, onOpenFull } = props;

    const maxDescriptionLength = 200;

    const handlePostClick = () => {
        if (onOpenFull) {
            onOpenFull(post.id);

            return;
        }
    };

    const description = getLocalized(post.description, lang);
    const isDescriptionTruncated = short && post.description
        && (description?.length || 0) > maxDescriptionLength;

    return <div
        className="article w-full mb-5 pb-5"
        data-post-id={ post.id }
        onClick={ handlePostClick }
        style={ onOpenFull ? { cursor: 'pointer' } : {} }
    >
        { short && <div
            className="flex justify-between mx-main-spacing md:mx-main-spacing-lg post-header-wrapper"
        >
            <div
                className="pr-2.5 max-w-[calc(100%-32px)] md:max-w-[calc(100%-40px)]"
            >
                <PostHeaderTitle
                    category={ post.category }
                    type={ post.type }
                    lang={ lang }
                />
                <PostDate happenedAt={ post.happenedAt }/>
            </div>
            <PostHeaderIcon type={ post.type }/>
        </div> }

        <div className="post-media md:mx-main-spacing-lg">
            <PostImage
                image={ post.image }
                lang={ lang }
                fullImage={ fullImage }
            />
            <PostVideo video={ post.video } lang={ lang }/>
        </div>

        <div className="mx-main-spacing md:mx-main-spacing-lg">
            <PostTitle title={ post.title } lang={ lang }/>
            <PostDescription
                shortDescription={ post.shortDescription }
                description={ post.description }
                lang={ lang }
                isShort={ short }
                maxDescriptionLength={ maxDescriptionLength }
            />
            <PostQuote quote={ post.quote } lang={ lang }/>
            <PostAudio audio={ post.audio } lang={ lang }/>
            { isDescriptionTruncated && <PostOpenFull
                onOpenFull={ handlePostClick }
            /> }
            <PostLink link={ post.link } lang={ lang }/>
        </div>
        { short && <div
            className="mt-7.5 border-b-8 border-main-color opacity-10 mx-0 md:mx-main-spacing-lg"
        /> }
    </div>;
};

export default PostCard;
