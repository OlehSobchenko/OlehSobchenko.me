'use client';

import { useEffect, useState } from 'react';
import CMS from 'decap-cms-app';
import { Widget as IdWidget } from '@ncwidgets/id';

export default function DecapCMS() {
    const repoName = process.env.NEXT_PUBLIC_REPOSITORY;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (!mounted) {
            setMounted(true);

            return;
        }

        console.log({ repoName });

        if (!window.CMS) {
            window.CMS_MANUAL_INIT = true;

            CMS.registerWidget(IdWidget.name, IdWidget.controlComponent);
            CMS.init({
                config: {
                    backend: {
                        name: 'github',
                        branch: 'main',
                        repo: repoName
                            ? repoName + '-Content'
                            : 'SerhiyGreench/OlehSobchenko.me-Content',
                    },
                    locale: 'uk',
                    i18n: {
                        structure: 'single_file',
                        locales: ['uk', 'en'],
                    },
                    media_folder: 'uploads',
                    public_folder: 'uploads',
                    collections: [
                        {
                            name: 'posts',
                            label: 'Допис',
                            folder: 'content/posts',
                            create: true,
                            slug: '{{path}}',
                            format: 'json',
                            i18n: true,
                            editor: {
                                preview: false,
                            },
                            fields: [
                                {
                                    label: 'ID',
                                    name: 'id',
                                    widget: 'ncw-id',
                                    i18n: 'duplicate',
                                    required: true,
                                    index_file: 'index.json',
                                    meta: true,
                                },
                                {
                                    label: 'Шлях',
                                    name: 'path',
                                    widget: 'string',
                                    hint: 'Намагайтеся створити якомога коротший шлях, надавайте перевагу використанню транслітерованого шляху латиницею',
                                },
                                {
                                    label: 'Заголовок',
                                    name: 'title',
                                    widget: 'string',
                                    i18n: true,
                                },
                                // {
                                //     label: 'Категорія',
                                //     name: 'categoryId',
                                //     widget: 'relation',
                                //     collection: 'categories',
                                //     value_field: 'id',
                                //     display_fields: ['name'],
                                //     search_fields: ['name'],
                                //     i18n: 'duplicate',
                                // },
                                {
                                    label: 'Тип',
                                    name: 'typeId',
                                    widget: 'relation',
                                    collection: 'types',
                                    value_field: 'id',
                                    display_fields: ['name'],
                                    search_fields: ['name'],
                                    i18n: 'duplicate',
                                },
                                {
                                    label: 'Дата створення',
                                    name: 'createdAt',
                                    widget: 'datetime',
                                    i18n: 'duplicate',
                                },
                                {
                                    label: 'Дата події',
                                    name: 'happenedAt',
                                    widget: 'datetime',
                                    i18n: 'duplicate',
                                },
                                {
                                    label: 'Короткий опис',
                                    name: 'shortDescription',
                                    widget: 'text',
                                    i18n: true,
                                },
                                {
                                    label: 'Тіло допису',
                                    name: 'description',
                                    widget: 'markdown',
                                    i18n: true,
                                },
                                {
                                    label: 'Цитата',
                                    name: 'quote',
                                    widget: 'text',
                                    i18n: true,
                                    required: false,
                                },
                            ],
                        },
                        {
                            name: 'categories',
                            label: 'Категорія',
                            folder: 'content/categories',
                            create: true,
                            slug: '{{id}}',
                            format: 'json',
                            i18n: true,
                            fields: [
                                {
                                    label: 'Назва',
                                    name: 'name',
                                    widget: 'string',
                                    i18n: true,
                                },
                            ],
                        },
                        {
                            name: 'types',
                            label: 'Тип допису',
                            folder: 'content/types',
                            create: true,
                            slug: '{{id}}',
                            format: 'json',
                            i18n: true,
                            fields: [
                                {
                                    label: 'Назва',
                                    name: 'name',
                                    widget: 'string',
                                    i18n: true,
                                },
                            ],
                        },
                    ],
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounted]);

    if (!mounted) {
        return null;
    }

    return <div id="nc-root" />;
}
