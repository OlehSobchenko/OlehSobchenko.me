const repoName = process.env.NEXT_PUBLIC_REPOSITORY || '';
const contentRepoName = repoName + '-Content';

const config = {
    repo: repoName,
    contentRepo: contentRepoName,
    idAlphabet: '1234567890abcdefghijklmnopqrstuvwxyz',
    contentFolder: 'content',
};

export default config;
