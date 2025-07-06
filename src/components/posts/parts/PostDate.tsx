const PostDate = ({ happenedAt }: { happenedAt?: string }) => {
    if (!happenedAt) {
        return null;
    }

    return <div className="text-sm py-0.5">
        { happenedAt.split('T')[0] }
    </div>;
};

export default PostDate;
