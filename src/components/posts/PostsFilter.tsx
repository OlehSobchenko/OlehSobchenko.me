import { ReactNode, useState } from 'react';
import PostsFilterContainer from '@/components/posts/PostsFilterContainer';

export interface PostsFilterProps {
    title: string | ReactNode;
}

export default function PostsFilter({ title }: PostsFilterProps) {
    const [openFilter, setOpenFilter] = useState(false);

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
        { openFilter && <PostsFilterContainer/> }
    </div>;
}
