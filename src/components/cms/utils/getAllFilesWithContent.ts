const getAllFilesWithContent = async (
    url: string,
    token: string,
) => {
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
};

export default getAllFilesWithContent;
