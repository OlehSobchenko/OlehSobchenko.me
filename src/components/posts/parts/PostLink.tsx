export const PostLink = ({ link, text, openLink }: {
    text: string;
    openLink: (path: string, newTab?: boolean) => () => void;
    link?: string;
}) => {
    if (!link) {
        return null;
    }

    return <div
        className="flex items-center justify-between text-lg pt-2.5 cursor-pointer"
        onClick={ event => {
            openLink(link, true)();
            event.preventDefault();
            event.stopPropagation();
        } }
    >
        <div className="uppercase">{ text }</div>
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
            >
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path
                    d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
                />
            </svg>
        </div>
    </div>;
};

export default PostLink;
