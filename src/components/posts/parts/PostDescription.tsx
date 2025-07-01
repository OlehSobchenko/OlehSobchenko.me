import truncateContent from '@/utils/truncateContent';
import Markdown from 'react-markdown';

const PostDescription = (props: {
    shortDescription?: string;
    description?: string;
    isShort: boolean;
    maxDescriptionLength: number;
}) => {
    const {
        shortDescription,
        description,
        isShort,
        maxDescriptionLength,
    } = props;

    if (!description && !shortDescription) {
        return null;
    }

    const fullHtml = description || '';
    const data = isShort && fullHtml
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
            components={{ p: 'span' }}
        >
            { data.output }
        </Markdown> }
        { data.truncated }
    </div>;
};

export default PostDescription;
