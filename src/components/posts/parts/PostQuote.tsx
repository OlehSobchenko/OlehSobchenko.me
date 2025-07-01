const PostQuote = ({ quote }: {
    quote?: string;
}) => {
    if (!quote) {
        return null;
    }

    return <div className="py-2.5 text-xl md:text-2xl">
        <blockquote>{ quote }</blockquote>
    </div>;
};

export default PostQuote;
