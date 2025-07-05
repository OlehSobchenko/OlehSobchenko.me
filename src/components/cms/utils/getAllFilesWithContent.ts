import fetchJSON from '@/utils/data/fetchJSON';

const getAllFilesWithContent = async (
    url: string,
    token: string,
) => {
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${ token }`,
            Accept: 'application/vnd.github+json',
        },
        cache: 'no-cache',
    });
    const files: any[] = await res.json();

    return Promise.all(files.map(async file => fetchJSON(file.download_url)));
};

export default getAllFilesWithContent;
