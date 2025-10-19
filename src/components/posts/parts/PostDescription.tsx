import truncateContent from '@/utils/truncateContent';
import Markdown from 'react-markdown';
import classNames from '@/utils/classNames';
import normalizeUrl from '@/utils/data/normalizeUrl';

const PostDescription = (props: {
    shortDescription?: string;
    description?: string;
    short: boolean;
    maxDescriptionLength: number;
}) => {
    const {
        shortDescription,
        description,
        short,
        maxDescriptionLength,
    } = props;

    if (!description && !shortDescription) {
        return null;
    }

    const fullHtml = description || '';
    const data = short && fullHtml
        ? truncateContent(fullHtml, maxDescriptionLength)
        : {
            output: fullHtml,
            truncated: false,
        }
    ;
    const showDescription = short
       ? !shortDescription && description
       : !!description
    ;

    return <div className="flex flex-col gap-2.5 py-2.5 text-lg leading-6">
        { shortDescription && <Markdown components={{ p: 'span' }}>
            { shortDescription }
        </Markdown> }
        { shortDescription && description && <>&nbsp;</> }
        { showDescription && <Markdown
            components={ short ? {
                p: 'span',
                img: () => null,
            } : {
                p: elProps => <span
                    { ...elProps }
                    className={ classNames(elProps.className, 'block mb-5') }
                />,
                img: elProps => <div
                    className="post-image flex flex-col justify-center"
                >
                    <img
                        { ...elProps }
                        src={
                            typeof elProps.src === 'string'
                                ? normalizeUrl(elProps.src)
                                : elProps.src
                        }
                        alt={ elProps.alt }
                        className={ classNames(
                            elProps.className,
                            'w-full max-h-full',
                        ) }
                    />
                    { elProps.title && <div
                        className="text-sm px-(--page-indent) lg:px-0 pt-2"
                    >
                        { elProps.title }
                    </div> }
                </div>,
            }}
        >
            { data.output }
        </Markdown> }
        { data.truncated }
    </div>;
};

export default PostDescription;
