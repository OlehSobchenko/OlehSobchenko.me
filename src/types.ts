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
    createdAt: string;
    happenedAt: string;
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
    video?: {
        link?: string;
        embed?: string;
    };
    audio?: string;
    locales?: Localized<{
        title?: string;
        shortDescription?: string;
        description?: string;
        quote?: string;
    }>;
};
