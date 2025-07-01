import getAllFilesWithContent
    from '@/components/cms/utils/getAllFilesWithContent';
import config from '@/config';
import getGithubToken from '@/components/cms/utils/getGithubToken';

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

    const files = await getAllFilesWithContent(
        `https://api.github.com/repos/${ input.repo }/contents/${
            input.contentFolder }/${ input.entity }`,
        input.token,
    );
    const index = input.convertor(files);
    const indexContent = JSON.stringify(index);
    const indexPath = `${ config.contentFolder }/${ input.entity }_index.json`;
    const base64Content = Buffer.from(indexContent).toString('base64');
    const fileUrl = `https://api.github.com/repos/${ input.repo }/contents/${ indexPath }`;
    const shaResponse = await fetch(
        fileUrl,
        {
            headers: {
                Authorization: `Bearer ${ input.token }`,
                Accept: 'application/vnd.github+json',
            },
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
        },
    );
};

const entitiesIndexing = async () => {
    const input = {
        token: getGithubToken(),
        contentFolder: config.contentFolder,
        repo: config.contentRepo,
    } as Pick<EntityIndexingInput, 'token' | 'contentFolder' | 'repo'>;

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
            icon: file.icon,
        })),
    });
};

export default entitiesIndexing;
