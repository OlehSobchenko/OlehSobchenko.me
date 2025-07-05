'use client';

import React from 'react';
import { Post } from '@/types';
import { Languages } from '@/i18n/config';
import getLocalized from '@/utils/getLocalized';
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
import config from '@/config';

interface PostCardProps {
    post: Post;
    lang: Languages;
    short?: boolean;
    fullImage?: boolean;
    onOpenFull?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = props => {
    const { post, lang, short = true, onOpenFull } = props;
    const maxDescriptionLength = config.maxDescriptionLength;

    const handlePostClick = () => {
        if (onOpenFull) {
            onOpenFull(post.id);

            return;
        }
    };

    const localized = getLocalized(lang, post.locales) || {};
    const isDescriptionTruncated = short && localized.description
        && (localized.description?.length || 0) > maxDescriptionLength;

    return <div
        className={ `article w-full ${ short ? 'mb-10' : 'pb-5' }` }
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
                short={ short }
            />
            <PostVideo video={ post.video } short={ short }/>
        </div>

        <div className="mx-main-spacing md:mx-main-spacing-lg">
            <PostTitle title={ localized.title }/>
            <PostDescription
                shortDescription={ localized.shortDescription }
                description={ localized.description }
                isShort={ short }
                maxDescriptionLength={ maxDescriptionLength }
            />
            <PostQuote quote={ localized.quote }/>
            <PostAudio audio={ post.audio } lang={ lang }/>
            { isDescriptionTruncated && <PostOpenFull
                onOpenFull={ handlePostClick }
            /> }
            <PostLink link={ post.link }/>
        </div>
        { short && <div
            className="should-be-hidden mt-7.5 border-b-8 border-main-color opacity-10 mx-0 md:mx-main-spacing-lg lg:mr-0 lg:ml-0 mr-[-36px] ml-[-36px]"
        /> }
    </div>;
};

export default PostCard;
