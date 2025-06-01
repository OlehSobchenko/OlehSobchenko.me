import React from 'react';

const PostDate: React.FC<{ happenedAt?: string }> = ({ happenedAt }) => {
    if (!happenedAt) {
        return null;
    }

    return <div className="text-sm py-0.5">
        { happenedAt.split('T')[0] }
    </div>;
};

export default PostDate;
