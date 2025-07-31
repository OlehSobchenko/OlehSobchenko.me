import truncateContent from '@/utils/truncateContent';
import Markdown from 'react-markdown';
import classNames from '@/utils/classNames';

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

    return <div className="py-2.5 text-lg leading-6">
        { shortDescription && <Markdown
            components={{ p: 'span' }}
        >
            { shortDescription }
        </Markdown> }
        { shortDescription && description && <>&nbsp;</> }
        { description && <Markdown
            components={ short ? {
                p: 'span',
            } : {
                p: elProps => <span
                    { ...elProps }
                    className={ classNames(elProps.className, 'block mb-5') }
                />,
            }}
        >
            { data.output }
        </Markdown> }
        { data.truncated }
    </div>;
};

export default PostDescription;
