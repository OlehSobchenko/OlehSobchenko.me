'use client';

import portrait from '@/images/main-photo.svg';
import PersonInfo from '@/components/specific/PersonInfo';
import ScrollDown from '@/components/specific/ScrollDown';
import MainContentActions from '@/components/MainContentActions';
import PostsContainer from '@/components/posts/PostsContainer';

export default function MainContent() {
    return <div id="main-content" className="relative">
        <div
            id="main-background"
            className={ 'lg:bg-[75%_calc(100%+2px)] bg-[center_calc(100%+2px)] h-screen bg-no-repeat lg:bg-size-[65vh] bg-size-[50vh] bg-position-y-[calc(100% + 2px)] lg:bg-position-x-[75%] bg-position-x-[50%]' }
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
