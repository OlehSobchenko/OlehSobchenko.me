'use client';

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
import PostSource from '@/components/posts/parts/PostSource';

interface PostCardProps {
    id: string;
    post: Post;
    locale: Languages;
    titles: {
        openFull: string;
        link: string;
    };
    short?: boolean;
    hideDivider?: boolean;
    openLink: (path: string, newTab?: boolean) => () => void;
}

const PostCard = (props: PostCardProps) => {
    const {
        post,
        locale,
        short = false,
        openLink,
        titles,
        id,
        hideDivider,
    } = props;
    const maxDescriptionLength = config.maxDescriptionLength;

    const handlePostClick = () => {
        if (short) {
            openLink(`/post/${ id }`)();
        }
    };

    const localized = getLocalized(locale, post.locales) || {};
    const isDescriptionTruncated = short && localized.description
        && (localized.description?.length || 0) > maxDescriptionLength;

    const showDivider = hideDivider === true
        ? false
        : short
    ;

    return <div
        id={ `post-${ id }` }
        className={ `article w-full ${ short ? 'mb-10' : 'lg:pb-12 pb-5' }` }
        onClick={ handlePostClick }
        style={ short ? { cursor: 'pointer' } : {} }
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
                    lang={ locale }
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
            <PostVideo video={ post.video }/>
        </div>

        <div className="mx-main-spacing md:mx-main-spacing-lg">
            <PostTitle title={ localized.title }/>
            <PostQuote quote={ localized.quote }/>
            <PostDescription
                shortDescription={ localized.shortDescription }
                description={ localized.description }
                short={ short }
                maxDescriptionLength={ maxDescriptionLength }
            />
            <PostAudio audio={ post.audio } lang={ locale }/>
            <PostSource source={ localized.source }/>
            { isDescriptionTruncated && <PostOpenFull
                text={ titles.openFull }
                onOpenFull={ handlePostClick }
            /> }
            <PostLink
                link={ post.link }
                text={ titles.link }
                openLink={ openLink }
            />
        </div>

        { showDivider && <div
            className="post-divider mt-7.5 border-b-8 border-main-color opacity-10 mx-0 md:mx-main-spacing-lg lg:mr-0 lg:ml-0"
        /> }
    </div>;
};

export default PostCard;
