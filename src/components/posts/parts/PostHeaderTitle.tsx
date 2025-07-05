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

    const tooltip = [
        getLocalized(lang, type?.name),
        getLocalized(lang, category?.name),
    ].filter(Boolean).map(i => i?.toUpperCase()).join(' | ');

    return <div
        title={ tooltip }
        className="min-w-0 max-w-full text-lg leading-tight w-full md:text-xl md:leading-xl overflow-hidden text-ellipsis whitespace-nowrap"
    >
        { type && <span className="uppercase">
          { getLocalized(lang, type.name) }
        </span> }
        { category && type && <span
            className="inline-block"
            style={{
                borderLeft: '2px solid var(--main-color)',
                margin: '0 9px',
                height: '1em',
                verticalAlign: 'middle',
            }}
        /> }
        { category && <span className="uppercase">
          { getLocalized(lang, category.name) }
        </span> }
    </div>;
};

export default PostHeaderTitle;
