'use client';

import { useEffect, useRef, useState } from 'react';
import CMS from 'decap-cms-app';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n/config';
import { customAlphabet } from 'nanoid';
import OutlinedButton from '@/components/base/OutlinedButton';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { CmsBackend, CmsWidgetControlProps } from 'decap-cms-core';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 8);
const CONTENT_FOLDER = 'content';

export function Control(props: CmsWidgetControlProps) {
    const {
        forID,
        classNameWrapper,
        setActiveStyle,
        setInactiveStyle,
        value,
        onChange,
        field,
    } = props as any;
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!value) {
            generateId();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => {
        if (!field.get('hidden')) {
            return;
        }

        const container = inputRef.current?.parentElement;

        if (container) {
            container.style.display = 'none';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const generateId = () => {
        const id = nanoid();

        onChange(id);
    };

    return <input
        type="text"
        className={ classNameWrapper }
        value={ value as unknown as string || '' }
        id={ forID }
        onFocus={ setActiveStyle }
        onBlur={ setInactiveStyle }
        disabled
        ref={ inputRef }
    />;
}

async function getAllFilesWithContent(
    url: string,
    token: string,
) {
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${ token }`,
            Accept: 'application/vnd.github+json',
        },
    });
    const files: any[] = await res.json();

    return Promise.all(files.map(async file => {
        const rawRes = await fetch(file.download_url);

        return rawRes.json();
    }));
}

export interface EntityIndexingInput {
    token: string;
    repo: string;
    contentFolder: string;
    entity: string,
    convertor: (files: any[]) => any,
    onStart?: () => void;
    onFinish?: () => void;
}

const entityIndexing = async (input: EntityIndexingInput) => {
    if (!input.token) {
        return;
    }

    console.log({
        input,
    });

    const files = await getAllFilesWithContent(
        `https://api.github.com/repos/${ input.repo }/contents/${
            input.contentFolder }/${ input.entity }`,
        input.token,
    );

    console.log({
        files,
    });
    const index = input.convertor(files);
    console.log({
        index,
    });
    const indexContent = JSON.stringify(index);
    console.log({
        indexContent,
    });
    const indexPath = `${ CONTENT_FOLDER }/${ input.entity }_index.json`;
    console.log({
        indexPath,
    });
    const base64Content = Buffer.from(indexContent).toString('base64');
    console.log({
        base64Content,
    });
    const fileUrl = `https://api.github.com/repos/${ input.repo }/contents/${ indexPath }`;
    console.log({
        fileUrl,
    });
    const shaResponse = await fetch(
        fileUrl,
        {
            headers: {
                Authorization: `Bearer ${ input.token }`,
                Accept: 'application/vnd.github+json',
            },
        },
    );
    console.log({
        shaResponse,
    });
    const sha = shaResponse?.ok ? (await shaResponse.json())?.sha : undefined;

    console.log({
        sha,
    });

    await fetch(
        `https://api.github.com/repos/${ input.repo }/contents/${ indexPath }`,
        {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${ input.token }`,
                'Content-Type': 'application/json',
                Accept: 'application/vnd.github+json',
            },
            body: JSON.stringify({
                message: 'Indexing Entities',
                content: base64Content,
                sha,
            }),
        },
    );
};

const getGithubToken = () => {
    const user = localStorage.getItem('decap-cms-user');

    return user ? JSON.parse(user).token : '';
};

const entitiesIndexing = async (
    input: Pick<EntityIndexingInput, 'token' | 'contentFolder' | 'repo'>,
) => {
    // await Promise.all([
    await entityIndexing({
            ...input,
            entity: 'posts',
            convertor: files => Object.fromEntries(files.map(data => ([
                data.id, `${ data.categoryId }/${ data.typeId }/${ data.createdAt }/${
                    data.happenedAt }`,
            ]))),
        });
        await entityIndexing({
            ...input,
            entity: 'categories',
            convertor: files => files.map(file => ({
                id: file.id,
                name: Object.fromEntries(
                    Object.keys(file.locales).map(
                        locale => [locale, file.locales[locale].name],
                    ),
                ),
            })),
        });
        await entityIndexing({
            ...input,
            entity: 'types',
            convertor: files => files.map(file => ({
                id: file.id,
                name: Object.fromEntries(
                    Object.keys(file.locales).map(
                        locale => [locale, file.locales[locale].name],
                    ),
                ),
            })),
        });
    // ]);
};

export default function DecapCMS() {
    const locale = useLocale();
    const repoName = process.env.NEXT_PUBLIC_REPOSITORY || '';
    const contentRepoName = repoName + '-Content';
    const [mounted, setMounted] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [indexing, setIndexing] = useState(false);

    const processIndexing = () => {
        setIndexing(true);
        entitiesIndexing({
            token: getGithubToken(),
            repo: contentRepoName,
            contentFolder: CONTENT_FOLDER,
        })
            .then(() => setIndexing(false))
            .catch(() => setIndexing(false))
        ;
    };

    useEffect(() => {
        if (!mounted) {
            const authorized = !!localStorage.getItem('decap-cms-user');

            setSubmitted(authorized);
            setMounted(true);

            return;
        }

        if (!window.CMS && submitted) {
            window.CMS_MANUAL_INIT = true;
            window.CMS = CMS;

            CMS.registerWidget('uuid', Control);
            CMS.registerEventListener({
                name: 'postSave',
                handler: async () => {
                    processIndexing();
                },
            });
            CMS.registerEventListener({
                name: 'postUnpublish',
                handler: async () => {
                    processIndexing();
                },
            });
            CMS.init({
                config: {
                    backend: {
                        name: 'github',
                        branch: 'main',
                        repo: contentRepoName,
                        use_graphql: true,
                    } as CmsBackend & { use_graphql?: boolean },
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
                            format: 'json',
                            i18n: false,
                            create: true,
                            folder: `${ CONTENT_FOLDER }/posts`,
                            slug: '{{id}}',
                            summary: '{{locales.uk.title}} (ID: {{id}})',
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
                                    display_fields: ['locales.uk.name'],
                                    search_fields: ['locales.uk.name'],
                                    required: false,
                                },
                                {
                                    label: 'Тип',
                                    name: 'typeId',
                                    widget: 'relation',
                                    collection: 'types',
                                    value_field: 'id',
                                    display_fields: ['locales.uk.name'],
                                    search_fields: ['locales.uk.name'],
                                    required: false,
                                },
                                {
                                    label: 'Дата створення',
                                    name: 'createdAt',
                                    widget: 'datetime',
                                    default: '{{now}}',
                                    required: false,
                                },
                                {
                                    label: 'Дата події',
                                    name: 'happenedAt',
                                    widget: 'datetime',
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
                                    widget: 'file',
                                    required: false,
                                },
                                {
                                    label: 'Audio',
                                    name: 'audio',
                                    widget: 'file',
                                    required: false,
                                },
                                {
                                    label: 'Локалізований вміст',
                                    name: 'locales',
                                    widget: 'object',
                                    fields: [
                                        {
                                            label: 'Українська',
                                            name: 'uk',
                                            widget: 'object',
                                            fields: [
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
                                            ],
                                        },
                                        {
                                            label: 'English',
                                            name: 'en',
                                            widget: 'object',
                                            fields: [
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
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: 'categories',
                            label: 'Категорія',
                            folder: `${ CONTENT_FOLDER }/categories`,
                            create: true,
                            slug: '{{id}}',
                            format: 'json',
                            editor: {
                                preview: false,
                            },
                            summary: '{{locales.uk.name}}',
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
                                    label: 'Локалізований вміст',
                                    name: 'locales',
                                    widget: 'object',
                                    fields: [
                                        {
                                            label: 'Українська',
                                            name: 'uk',
                                            widget: 'object',
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
                                            label: 'English',
                                            name: 'en',
                                            widget: 'object',
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
                            ],
                        },
                        {
                            name: 'types',
                            label: 'Тип допису',
                            folder: `${ CONTENT_FOLDER }/types`,
                            create: true,
                            slug: '{{id}}',
                            summary: '{{locales.uk.name}}',
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
                                    label: 'Локалізований вміст',
                                    name: 'locales',
                                    widget: 'object',
                                    fields: [
                                        {
                                            label: 'Українська',
                                            name: 'uk',
                                            widget: 'object',
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
                                            label: 'English',
                                            name: 'en',
                                            widget: 'object',
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

    return <ErrorBoundary errorComponent={ () => <div>CMS Failed</div> }>
        <div className="min-h-screen flex flex-col justify-between">
            <div>
                <div id="nc-root"/>
            </div>
            <div
                className={
                    'flex justify-between items-center gap-8 w-screen p-6'
                }
            >
                <div>
                    Натисніть <strong>Індексувати</strong>, наприклад, якщо
                    допис не відображається у стрічці головній сторінці
                </div>
                <div className="flex justify-end flex-1">
                    { !indexing && <OutlinedButton
                        className="border-4!"
                        onClick={ processIndexing }
                    >
                        <div className="font-black">ІНДЕКСУВАТИ</div>
                    </OutlinedButton> }
                    { indexing && <div>Ідексування...</div> }
                </div>
            </div>
        </div>
    </ErrorBoundary>;
}
