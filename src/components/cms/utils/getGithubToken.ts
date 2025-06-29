const getGithubToken = () => {
    const user = localStorage.getItem('decap-cms-user');

    return user ? JSON.parse(user).token : '';
};

export default getGithubToken;
