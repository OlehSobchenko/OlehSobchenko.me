import React from 'react';
import { Type } from '@/components/posts/types';

const PostHeaderIcon: React.FC<{ type?: Type }> = ({ type }) => {
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
