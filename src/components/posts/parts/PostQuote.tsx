import React from 'react';
import { Languages, Localization } from '@/i18n/config';
import getLocalized from '@/utils/getLocalized';

const PostQuote: React.FC<{
    quote?: Localization;
    lang: Languages;
}> = ({ quote, lang }) => {
    if (!quote) {
        return null;
    }

    return <div className="py-2.5 text-xl md:text-2xl">
        <blockquote>{ getLocalized(quote, lang) }</blockquote>
    </div>;
};

export default PostQuote;
