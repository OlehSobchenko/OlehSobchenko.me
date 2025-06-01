import ThemeSwitcher from '@/components/specific/ThemeSwitcher';
import LanguageSwitcher from '@/components/specific/LanguageSwitcher';
import PostsSearch from '@/components/specific/PostsSearch';

export default function MainContentActions() {
    return <div className="absolute lg:top-16 lg:right-16 top-8 right-8">
        <div className="flex items-center gap-x-4 flex-col lg:flex-row lg:gap-x-1">
            <PostsSearch/>
            <ThemeSwitcher/>
            <LanguageSwitcher/>
        </div>
        <div className="cursor-pointer mt-8 lg:hidden">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48px"
                viewBox="0 0 24 24"
                width="48px"
            >
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"
                />
            </svg>
        </div>
    </div>;
}