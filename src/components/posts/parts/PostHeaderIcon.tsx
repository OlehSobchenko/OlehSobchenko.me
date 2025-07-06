import { Type } from '@/types';

const PostHeaderIcon = ({ type }: { type?: Type }) => {
    if (!type?.icon) {
        return null;
    }

    return <div className="flex justify-center items-center">
        <span
            dangerouslySetInnerHTML={ { __html: type.icon } }
            className="w-10 h-10"
        />
    </div>;
};

export default PostHeaderIcon;
