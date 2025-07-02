import { ReactNode, useState } from 'react';
import PostsFilter from '@/components/posts/PostsFilter';
import LabeledIconContent from '@/components/base/LabeledIconContent';
import OutlinedButton from '@/components/base/OutlinedButton';
import { useTranslations } from 'next-intl';
import { usePostsContext } from '@/components/providers/PostsProvider';

export interface PostsFilterProps {
    title: string | ReactNode;
}

export default function PostsFilterContainer({ title }: PostsFilterProps) {
    const t = useTranslations('PostsContainer');
    const [openFilter, setOpenFilter] = useState(false);
    const { filter: { empty, clear } } = usePostsContext();

    return <div className="uppercase lg:pb-16 pb-8">
        <div
            className="flex justify-between items-center gap-x-4 lg:pb-8 pb-4"
        >
            { title }
            <div
                className="cursor-pointer select-none"
                onClick={ () => setOpenFilter(prev => !prev) }
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="56px"
                    viewBox="0 -960 960 960"
                    width="56px"
                >
                    { openFilter && <path
                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                    /> }
                    { !openFilter && <path
                        d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"
                    /> }
                </svg>
            </div>
        </div>
        { openFilter && <PostsFilter/> }
        <div
            className={
                `transition-all duration-300 ease-in-out overflow-hidden ${
                    !empty ? 'opacity-100' : 'opacity-0'
                }`
            }
        >
            { !empty && <OutlinedButton
                className="lg:text-[40px] text-2xl mb-6 pt-0.5"
                onClick={ clear }
            >
                <LabeledIconContent
                    iconContent={ <path
                        d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
                    /> }
                >
                    { t('clearFilter') }
                </LabeledIconContent>
            </OutlinedButton> }
        </div>
    </div>;
}
