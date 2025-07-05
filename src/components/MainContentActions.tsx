import ThemeSwitcher from '@/components/specific/ThemeSwitcher';
import LanguageSwitcher from '@/components/specific/LanguageSwitcher';
import PostsSearch from '@/components/specific/PostsSearch';
import AudioControl from '@/components/specific/AudioControl';

export default function MainContentActions() {
    return <div
        className="absolute lg:top-(--page-indent) lg:right-(--page-indent) top-[calc(var(--page-indent)-var(--page-indent)/4)] right-[calc(var(--page-indent)-var(--page-indent)/4)] z-501 select-none"
    >
        <div
            className="flex items-center gap-x-4 flex-col lg:flex-row lg:gap-x-1"
        >
            <PostsSearch/>
            <ThemeSwitcher/>
            <LanguageSwitcher/>
        </div>
        <AudioControl/>
    </div>;
}
