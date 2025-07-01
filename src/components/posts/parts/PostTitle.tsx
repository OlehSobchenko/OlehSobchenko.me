const PostTitle = ({ title }: { title?: string }) => {
    if (!title) {
        return null;
    }

    return <div className="py-2 text-2xl font-black md:text-4xl uppercase">
        { title }
    </div>;
};

export default PostTitle;
