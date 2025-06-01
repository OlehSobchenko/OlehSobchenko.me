import portrait from '@/img/main-photo.svg';
import PersonInfo from '@/components/specific/PersonInfo';
import ScrollDown from '@/components/specific/ScrollDown';
import MainContentActions from '@/components/MainContentActions';
import PostsContainer from '@/components/posts/PostsContainer';

export default async function MainContent() {
    return <div className="relative" id="main-content">
        <div
            id="main-background"
            className={ 'lg:bg-[75%_calc(100%+2px)] bg-[center_calc(100%+2px)] h-screen bg-no-repeat lg:bg-size-[65vh] bg-size-[50vh] bg-position-y-[calc(100% + 2px)] lg:bg-position-x-[75%] bg-position-x-[50%]' }
            style={ {
                backgroundImage: `linear-gradient(to bottom, var(--gradient-background-color-start) 80%, var(--gradient-background-color-end)), url("${ portrait.src }")`,
            } }
        >
            <div className="h-screen lg:pt-16 lg:pl-16 lg:pr-16 pt-8 pl-8 pb-8">
                <div
                    className="flex h-full lg:items-center lg:pl-16">
                    <PersonInfo/>
                </div>
            </div>
        </div>
        <MainContentActions/>
        <ScrollDown/>
        <PostsContainer/>
    </div>;
}
