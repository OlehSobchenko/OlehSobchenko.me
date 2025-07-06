const PostOpenFull = ({ text, onOpenFull }: {
    text: string;
    onOpenFull: () => void;
}) => {
    return <div
        className="flex items-center justify-between text-lg pt-2.5 cursor-pointer"
        onClick={ onOpenFull }
    >
        <div className="uppercase">{ text }</div>
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
            >
                <path
                    d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"
                />
            </svg>
        </div>
    </div>;
};

export default PostOpenFull;
