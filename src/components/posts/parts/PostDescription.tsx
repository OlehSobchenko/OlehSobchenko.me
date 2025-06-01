import React from 'react';
import { Languages, Localization } from '@/i18n/config';
import getLocalized from '@/utils/getLocalized';
import truncateHTML from '@/utils/truncateHTML';

const PostDescription: React.FC<{
    shortDescription?: Localization;
    description?: Localization;
    lang: Languages;
    isShort: boolean;
    maxDescriptionLength: number;
}> = props => {
    const {
        shortDescription,
        description,
        lang,
        isShort,
        maxDescriptionLength,
    } = props;

    if (!description && !shortDescription) {
        return null;
    }

    const fullHtml = description ? getLocalized(description, lang) : '';
    const data = isShort && fullHtml
        ? truncateHTML(fullHtml, maxDescriptionLength)
        : {
            html: fullHtml,
            truncated: false,
        }
    ;

    return <div className="py-2.5 text-lg leading-6">
        { shortDescription && <span
            dangerouslySetInnerHTML={ {
                __html: getLocalized(shortDescription, lang) || '',
            } }
        /> }
        { shortDescription && description && <>&nbsp;</> }
        { description && <span
            dangerouslySetInnerHTML={ { __html: data.html || '' } }
        /> }
        { data.truncated }
    </div>;
};

export default PostDescription;
