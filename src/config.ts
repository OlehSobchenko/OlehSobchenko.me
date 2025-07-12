const repo = process.env.NEXT_PUBLIC_REPOSITORY || '';
const baseUrl = process.env.NEXT_BASE_URL || 'https://olehsobchenko.me';
const suffixContentRepo = '-Content';
const contentBranch = 'main';
const contentFolder = 'content';
const uploadsFolder = 'uploads';
const contentRepo = process.env.NEXT_PUBLIC_CONTENT_REPOSITORY
    || `${ repo }${ suffixContentRepo }`;
const dataBaseUrl = process.env.NEXT_DATA_BASE_URL
    || `https://raw.githubusercontent.com/${ contentRepo }/refs/heads/${
        contentBranch }/`;
const contentUrl = `${ dataBaseUrl }${ contentFolder }/`;
const uploadsUrl = `${ dataBaseUrl }${ uploadsFolder }/`;

const config = {
    repo,
    contentRepo,
    contentFolder,
    uploadsFolder,
    baseUrl,
    dataBaseUrl,
    contentUrl,
    uploadsUrl,
    postsBatch: 10,
    postsSearch: {
        resultItems: 50,
        minQueryLength: 2,
    },
    maxDescriptionLength: 200,
    idSize: 6,
    idAlphabet: '1234567890abcdefghijklmnopqrstuvwxyz',
    postsIndexSeparator: '|',
    storageKeys: {
        cmsUser: 'decap-cms-user',
        theme: 'theme',
    },
};

export default config;
