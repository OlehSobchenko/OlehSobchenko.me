import React from 'react';
import { Category, Type } from '@/types';
import { Languages } from '@/i18n/config';
import getLocalized from '@/utils/getLocalized';

const PostHeaderTitle: React.FC<{
    category?: Category;
    type?: Type;
    lang: Languages;
}> = ({ category, type, lang }) => {
    if (!category && !type) {
        return null;
    }

    return <div
        className="flex max-w-full text-lg leading-tight overflow-hidden text-ellipsis whitespace-nowrap md:text-xl md:leading-xl"
    >
        { type && <span className="uppercase">
          { getLocalized(lang, type.name) }
        </span> }
        { category && type && <div
            style={{
                borderLeft: '2px solid var(--main-color)',
                margin: '3px 9px 5px',
            }}
        /> }
        { category && <span className="uppercase">
          { getLocalized(lang, category.name) }
        </span> }
    </div>;
};

export default PostHeaderTitle;
