import { CmsBackend, CmsConfig, CmsField } from 'decap-cms-core';
import { languages, locales } from '@/i18n/config';
import config from '@/config';

export interface GetCmsConfigInput {
    repo: string;
    locale: string;
}

const getLocalizedContentField = (
    fields: CmsField[],
): CmsField => ({
    label: 'Локалізований вміст',
    name: 'locales',
    widget: 'object',
    collapsed: true,
    fields: Object.entries(languages).map(([name, label]) => ({
        label: `${ label } (${ name.toUpperCase() })`,
        name,
        widget: 'object',
        fields,
    })),
});

const getCmsConfig = (
    input: GetCmsConfigInput,
): CmsConfig => ({
    backend: {
        name: 'github',
        branch: 'main',
        repo: input.repo,
        use_graphql: true,
    } as CmsBackend & { use_graphql?: boolean },
    locale: input.locale,
    i18n: {
        structure: 'single_file',
        locales,
    },
    media_folder: 'uploads',
    public_folder: 'uploads',
    collections: [
        {
            name: 'posts',
            label: 'Допис',
            format: 'json',
            i18n: false,
            create: true,
            folder: `${ config.contentFolder }/posts`,
            slug: '{{id}}',
            summary: `{{locales.${ input.locale }.title}} (ID: {{id}})`,
            editor: {
                preview: false,
            },
            fields: [
                {
                    label: 'ID',
                    name: 'id',
                    widget: 'uuid',
                    required: true,
                    index_file: 'index.json',
                    meta: false,
                },
                {
                    label: 'Категорія',
                    name: 'categoryId',
                    widget: 'relation',
                    collection: 'categories',
                    value_field: 'id',
                    display_fields: [`locales.${ input.locale }.name`],
                    search_fields: [`locales.${ input.locale }.name`],
                },
                {
                    label: 'Тип',
                    name: 'typeId',
                    widget: 'relation',
                    collection: 'types',
                    value_field: 'id',
                    display_fields: [`locales.${ input.locale }.name`],
                    search_fields: [`locales.${ input.locale }.name`],
                },
                {
                    label: 'Дата створення',
                    name: 'createdAt',
                    widget: 'datetime',
                    default: '{{now}}',
                    required: true,
                },
                {
                    label: 'Дата події',
                    name: 'happenedAt',
                    widget: 'datetime',
                    required: true,
                },
                {
                    label: 'Зображення',
                    name: 'image',
                    widget: 'image',
                    required: false,
                    choose_url: true,
                    media_library: {
                        name: undefined as unknown as string,
                        config: {
                            multiple: false,
                        },
                    },
                },
                {
                    label: 'Посилання',
                    name: 'link',
                    widget: 'string',
                    required: false,
                },
                {
                    label: 'Video',
                    name: 'video',
                    widget: 'object',
                    collapsed: true,
                    required: false,
                    fields: [
                        {
                            label: 'Посилання',
                            name: 'link',
                            widget: 'file',
                            required: false,
                        },
                        {
                            label: 'Код вставки',
                            name: 'embed',
                            widget: 'text',
                            required: false,
                        },
                    ],
                },
                {
                    label: 'Аудіо',
                    name: 'audioId',
                    widget: 'relation',
                    collection: 'audios',
                    value_field: 'id',
                    display_fields: [
                        `{{locales.${ input.locale }.name}} - `,
                        `locales.${ input.locale }.description`,
                        `(Шлях: {{link}})`,
                    ],
                    search_fields: [
                        `locales.${ input.locale }.name`,
                        `locales.${ input.locale }.description`,
                        `link`,
                    ],
                    required: false,
                },
                getLocalizedContentField([
                    {
                        label: 'Заголовок',
                        name: 'title',
                        widget: 'string',
                        required: false,
                    },
                    {
                        label: 'Цитата',
                        name: 'quote',
                        widget: 'text',
                        required: false,
                    },
                    {
                        label: 'Короткий опис',
                        name: 'shortDescription',
                        widget: 'text',
                        required: false,
                    },
                    {
                        label: 'Тіло допису',
                        name: 'description',
                        widget: 'markdown',
                        required: false,
                    },
                ]),
            ],
        },
        {
            name: 'audios',
            label: 'Аудіофайли',
            folder: `${ config.contentFolder }/audios`,
            create: true,
            slug: '{{id}}',
            format: 'json',
            editor: {
                preview: false,
            },
            summary: `{{locales.${ input.locale }.name}} - {{locales.${
                input.locale }.description}} (Шлях: {{link}})`,
            fields: [
                {
                    label: 'ID',
                    name: 'id',
                    widget: 'uuid',
                    required: true,
                    index_file: 'index.json',
                    meta: false,
                },
                {
                    label: 'Аудіофайл',
                    name: 'link',
                    widget: 'file',
                    required: true,
                },
                {
                    label: 'Найпріоритетніший',
                    name: 'prioritized',
                    widget: 'boolean',
                    default: false,
                },
                getLocalizedContentField([
                    {
                        label: 'Назва',
                        name: 'name',
                        widget: 'string',
                        i18n: true,
                        required: true,
                    },
                    {
                        label: 'Опис',
                        name: 'description',
                        widget: 'string',
                        i18n: true,
                        required: true,
                    },
                ]),
            ],
        },
        {
            name: 'categories',
            label: 'Категорія',
            folder: `${ config.contentFolder }/categories`,
            create: true,
            slug: '{{id}}',
            format: 'json',
            editor: {
                preview: false,
            },
            summary: `{{locales.${ input.locale }.name}}`,
            fields: [
                {
                    label: 'ID',
                    name: 'id',
                    widget: 'uuid',
                    required: true,
                    index_file: 'index.json',
                    meta: false,
                },
                getLocalizedContentField([
                    {
                        label: 'Назва',
                        name: 'name',
                        widget: 'string',
                        i18n: true,
                    },
                ]),
            ],
        },
        {
            name: 'types',
            label: 'Тип допису',
            folder: `${ config.contentFolder }/types`,
            create: true,
            slug: '{{id}}',
            summary: `{{locales.${ input.locale }.name}}`,
            format: 'json',
            editor: {
                preview: false,
            },
            fields: [
                {
                    label: 'ID',
                    name: 'id',
                    widget: 'uuid',
                    required: true,
                    index_file: 'index.json',
                    meta: false,
                },
                {
                    label: 'Іконка',
                    name: 'icon',
                    widget: 'text',
                    required: true,
                },
                getLocalizedContentField([
                    {
                        label: 'Назва',
                        name: 'name',
                        widget: 'string',
                        i18n: true,
                    },
                ]),
            ],
        },
        {
            name: 'singletons',
            label: 'Одиничні об\'єкти',
            create: true,
            delete: false,
            editor: {
                preview: false,
            },
            format: 'json',
            files: [
                {
                    file: `${ config.contentFolder }/biography.json`,
                    label: 'Біографія',
                    name: 'biography',
                    fields: Object.entries(languages).map(([name, label]) => ({
                        label: `${ label } (${ name.toUpperCase() })`,
                        name,
                        widget: 'markdown',
                    })),
                },
            ],
        },
    ],
});

export default getCmsConfig;
