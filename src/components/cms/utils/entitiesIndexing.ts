import getAllFilesWithContent
    from '@/components/cms/utils/getAllFilesWithContent';
import config from '@/config';
import getGithubToken from '@/components/cms/utils/getGithubToken';
import { Audio, Post } from '@/types';
import Search from '@/utils/search';
import { locales } from '@/i18n/config';
import Compression from '@/utils/compression';

export interface EntityIndexingInput {
    token: string;
    repo: string;
    contentFolder: string;
    entity: string,
    converter?: (files: any[]) => any,
    onStart?: () => void;
    onFinish?: () => void;
    fileSuffix?: string;
    files?: any[];
}

const entityIndexing = async (input: EntityIndexingInput) => {
    if (!input.token) {
        return [];
    }

    const files = input.files ? input.files : await getAllFilesWithContent(
        `https://api.github.com/repos/${ input.repo }/contents/${
            input.contentFolder }/${ input.entity }`,
        input.token,
    );
    const index = input.converter
        ? await Promise.resolve(input.converter(files))
        : files
    ;
    const indexContent = typeof index === 'string' || index instanceof Uint8Array
        ? index
        : JSON.stringify(index);
    const fileSuffix = input.fileSuffix || '_index.json';
    const indexPath = `${ config.contentFolder }/${ input.entity }${ fileSuffix }`;
    const base64Content = Buffer.from(indexContent).toString('base64');
    const fileUrl = `https://api.github.com/repos/${ input.repo }/contents/${ indexPath }`;
    const shaResponse = await fetch(
        fileUrl,
        {
            headers: {
                Authorization: `Bearer ${ input.token }`,
                Accept: 'application/vnd.github+json',
            },
            cache: 'no-cache',
        },
    );
    const sha = shaResponse?.ok ? (await shaResponse.json())?.sha : undefined;

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
            cache: 'no-cache',
        },
    );

    return files;
};

type Entities = 'posts' | 'categories' | 'types' | 'audios' | 'postsSearch';

const entitiesIndexing = async (indexedEntities?: Entities[]) => {
    const input = {
        token: getGithubToken(),
        contentFolder: config.contentFolder,
        repo: config.contentRepo,
    } as Pick<EntityIndexingInput, 'token' | 'contentFolder' | 'repo'>;

    const categories = !indexedEntities || indexedEntities.includes('categories')
        ? await entityIndexing({
            ...input,
            entity: 'categories',
            converter: files => files.map(file => ({
                id: file.id,
                name: Object.fromEntries(
                    Object.keys(file.locales).map(
                        locale => [locale, file.locales[locale].name],
                    ),
                ),
            })),
        })
        : []
    ;

    const types = !indexedEntities || indexedEntities.includes('types')
        ? await entityIndexing({
            ...input,
            entity: 'types',
            converter: async files => files.map(file => ({
                id: file.id,
                name: Object.fromEntries(
                    Object.keys(file.locales).map(
                        locale => [locale, file.locales[locale].name],
                    ),
                ),
                icon: file.icon,
            })),
        })
        : []
    ;

    const audios: Audio[] = !indexedEntities || indexedEntities.includes('audios')
        ? await entityIndexing({ ...input, entity: 'audios' })
        : []
    ;

    if (!indexedEntities || indexedEntities.includes('posts')) {
        const files: Post[] = await entityIndexing({
            ...input,
            entity: 'posts',
            fileSuffix: '_index.gz',
            converter: files => Compression.compress(
                JSON.stringify(Object.fromEntries(files.map(data => ([
                    data.id,
                    [
                        data.categoryId,
                        data.typeId,
                        data.createdAt,
                        data.happenedAt,
                        data.audioId,
                    ].join(config.postsIndexSeparator),
                ])))),
            ),
        });

        for await (const locale of locales) {
            await entityIndexing({
                ...input,
                entity: 'posts',
                files,
                fileSuffix: `_search_${ locale }.gz`,
                converter: async files => {
                    const items = files.map(file => {
                        const audio = file.audioId
                            ? audios.find(a => a.id === file.audioId)
                            : undefined
                        ;
                        const type = file.typeId
                            ? types.find(t => t.id === file.typeId)
                            : undefined
                        ;
                        const category = file.categoryId
                            ? categories.find(c => c.id === file.categoryId)
                            : undefined
                        ;
                        const localized = (file.locales || {})[locale];
                        const localizedType = (type.locales || {})[locale];
                        const localizedCategory = (
                            category.locales || {}
                        )[locale];
                        const localizedAudio = (audio?.locales || {})[locale];
                        const textArray = [
                            localized?.description,
                            localized?.shortDescription,
                            localized?.title,
                            localized?.quote,
                            localizedAudio?.name,
                            localizedAudio?.description,
                            localizedType?.name,
                            localizedCategory?.name,
                        ].filter(Boolean);

                        return { id: file.id, text: textArray };
                    });
                    const search = new Search({ items });

                    return Compression.compress(
                        JSON.stringify(search.serialize()),
                    );
                },
            });
        }
    }
};

export default entitiesIndexing;
