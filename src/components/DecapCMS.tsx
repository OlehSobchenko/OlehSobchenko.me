'use client';

import { useEffect, useState } from 'react';
import CMS from 'decap-cms-app';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n/config';
import { customAlphabet } from 'nanoid';
import OutlinedButton from '@/components/base/OutlinedButton';

const nanoid = customAlphabet('1234567890abcdef', 10);

function UuidControl(props: any) {
    const {
        forID,
        value,
        onChange,
        classNameWrapper,
    } = props;

    return (
        <div style={{ display: 'flex' }}>
            <input
                type="hidden"
                id={ forID }
                className={ classNameWrapper }
                value={ value || nanoid() }
                onChange={ e => onChange(e.target.value.trim()) }
            />
            <div>{ value || nanoid() }</div>
            <button
                onClick={() => onChange(nanoid()) }
                style={{ marginLeft: '1em' }}
            >
                Regenerate ID
            </button>
        </div >
    );
}

export function UuidPreview({ value }) {
    return <div style={{ color: 'inherit' }}>{ value }</div>;
}

export default function DecapCMS() {
    const locale = useLocale();
    const repoName = process.env.NEXT_PUBLIC_REPOSITORY;
    const [mounted, setMounted] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!mounted) {
            setMounted(true);

            const authorized = !!localStorage.getItem('decap-cms-user');

            setSubmitted(authorized);

            return;
        }

        if (!window.CMS && submitted) {
            window.CMS_MANUAL_INIT = true;

            CMS.registerWidget('uuid', UuidControl, UuidPreview);
            CMS.init({
                config: {
                    backend: {
                        name: 'github',
                        branch: 'main',
                        repo: repoName
                            ? repoName + '-Content'
                            : 'SerhiyGreench/OlehSobchenko.me-Content',
                    },
                    locale,
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
                            folder: 'content/posts',
                            create: true,
                            slug: '{{id}}',
                            format: 'json',
                            i18n: true,
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
                                    required: false,
                                },
                                {
                                    label: 'Категорія',
                                    name: 'categoryId',
                                    widget: 'relation',
                                    collection: 'categories',
                                    value_field: 'id',
                                    display_fields: ['name'],
                                    search_fields: ['name'],
                                    i18n: 'duplicate',
                                    required: false,
                                },
                                {
                                    label: 'Тип',
                                    name: 'typeId',
                                    widget: 'relation',
                                    collection: 'types',
                                    value_field: 'id',
                                    display_fields: ['name'],
                                    search_fields: ['name'],
                                    i18n: 'duplicate',
                                    required: false,
                                },
                                {
                                    label: 'Дата створення',
                                    name: 'createdAt',
                                    widget: 'datetime',
                                    i18n: 'duplicate',
                                    default: '{{now}}',
                                    required: false,
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
                                    required: false,
                                },
                                {
                                    label: 'Тіло допису',
                                    name: 'description',
                                    widget: 'markdown',
                                    i18n: true,
                                    required: false,
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
                                    label: 'ID',
                                    name: 'id',
                                    widget: 'uuid',
                                    required: true,
                                    index_file: 'index.json',
                                    meta: true,
                                },
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
                                    label: 'ID',
                                    name: 'id',
                                    widget: 'uuid',
                                    required: true,
                                    index_file: 'index.json',
                                    meta: true,
                                },
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
    }, [mounted, submitted]);

    if (!mounted) {
        return null;
    }

    if (!submitted) {
        return <div style={{ padding: '2rem' }} className="flex flex-col items-end">
            <input
                className="border-4!"
                type="password"
                placeholder="GitHub Personal Access Token"
                style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginBottom: '1rem',
                }}
            />
            <OutlinedButton
                className="border-4! outline-0 focus:outline-0 focus:rounded-none"
                onClick={ e => {
                    const token = (
                        e.currentTarget.parentElement
                            ?.children[0] as HTMLInputElement
                    )?.value;

                    fetch('https://api.github.com/user', {
                        headers: {
                            'Accept': 'application/vnd.github+json',
                            'Authorization': `Bearer ${ token }`,
                            'X-GitHub-Api-Version': '2022-11-28',
                        },
                    }).then(res => res.json()).then(json => {
                        localStorage.setItem('decap-cms-user', JSON.stringify({
                            ...json,
                            token,
                            backendName: 'github',
                        }));

                        setSubmitted(true);
                    });
                } }
            >
                Login
            </OutlinedButton>
        </div>;
    }

    return <div id="nc-root" />;
}
