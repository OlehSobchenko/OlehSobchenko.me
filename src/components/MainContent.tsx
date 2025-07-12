'use client';

import portrait from '@/images/main-photo.svg';
import PersonInfo from '@/components/specific/PersonInfo';
import ScrollDown from '@/components/specific/ScrollDown';
import MainContentActions from '@/components/MainContentActions';
import PostsContainer from '@/components/posts/PostsContainer';

export default function MainContent() {
    return <div className="relative">
        <div
            id="main-background"
            className="main-background"
            style={ {
                backgroundImage: `var(--photo-gradient), url("${ portrait.src }")`,
            } }
        >
            <MainContentActions/>
            <div className="relative max-w-[1920px] ml-auto mr-auto">
                <div className="h-screen pt-(--page-indent) pl-(--page-indent) pb-(--page-indent)">
                    <div
                        className="flex h-full lg:items-center lg:pl-16">
                        <PersonInfo/>
                    </div>
                </div>
            </div>
        </div>
        <div className="max-w-[1920px] ml-auto mr-auto">
            <ScrollDown/>
            <PostsContainer/>
        </div>
    </div>;
}
