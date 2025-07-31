import { Localized } from '@/i18n/config';

export type Category = {
    id: string;
    name: Localized;
};

export type Type = {
    id: string;
    name: Localized;
    icon?: string;
};

export type PostIndex = {
    id: string;
    categoryId?: string;
    typeId?: string;
    audioId?: string;
    createdAt: string;
    happenedAt: string;
};

export type Audio = {
    id: string;
    link?: string;
    thumbnail?: string;
    prioritized?: boolean;
    locales?: Localized<{
        name?: string;
        description?: string;
    }>;
};

export type Video = {
    link?: string;
    embed?: string;
};

export type Post = {
    id: string;
    categoryId?: string;
    typeId?: string;
    type?: Type;
    category?: Category;
    createdAt: string;
    happenedAt: string;
    link?: string;
    image?: string;
    video?: Video;
    audio?: Audio;
    locales?: Localized<{
        title?: string;
        shortDescription?: string;
        description?: string;
        quote?: string;
        source?: string;
    }>;
};
