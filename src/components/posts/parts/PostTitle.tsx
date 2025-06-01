import React from 'react';
import { Languages, Localization } from '@/i18n/config';
import getLocalized from '@/utils/getLocalized';

const PostTitle: React.FC<{
    title?: Localization;
    lang: Languages;
}> = ({ title, lang }) => {
    if (!title) {
        return null;
    }

    return <div className="py-2 text-2xl font-black md:text-4xl">
        { getLocalized(title, lang)?.toUpperCase() }
    </div>;
};

export default PostTitle;
