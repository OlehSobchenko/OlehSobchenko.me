const repoName = process.env.NEXT_PUBLIC_REPOSITORY || '';
const contentRepoName = repoName + '-Content';
const contentFolder = 'content';
const uploadsFolder = 'uploads';
const dataBaseUrl = `https://raw.githubusercontent.com/${
    contentRepoName }/main/`;

const config = {
    postsBatch: 6,
    repo: repoName,
    contentRepo: contentRepoName,
    idAlphabet: '1234567890abcdefghijklmnopqrstuvwxyz',
    contentFolder,
    uploadsFolder,
    dataBaseUrl,
    contentUrl: `${ dataBaseUrl }${ contentFolder }/`,
    uploadsUrl: `${ dataBaseUrl }${ uploadsFolder }/`,
    maxDescriptionLength: 200,
};

export default config;
