const repoName = process.env.NEXT_PUBLIC_REPOSITORY || '';
const contentRepoName = repoName + '-Content';
const contentFolder = 'content';
const uploadsFolder = 'uploads';
const dataBaseUrl = `https://raw.githubusercontent.com/${
    contentRepoName }/refs/heads/main/`;

const config = {
    postsBatch: 10,
    repo: repoName,
    contentRepo: contentRepoName,
    idAlphabet: '1234567890abcdefghijklmnopqrstuvwxyz',
    idSize: 6,
    contentFolder,
    uploadsFolder,
    dataBaseUrl,
    contentUrl: `${ dataBaseUrl }${ contentFolder }/`,
    uploadsUrl: `${ dataBaseUrl }${ uploadsFolder }/`,
    maxDescriptionLength: 200,
    postsIndexSeparator: '|',
};

export default config;
