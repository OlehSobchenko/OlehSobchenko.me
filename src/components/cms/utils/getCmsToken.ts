import parseJSON from '@/utils/pasreJSON';
import config from '@/config';

const getCmsToken = () => {
    return parseJSON(localStorage.getItem(config.storageKeys.cmsUser))?.token;
};

export default getCmsToken;
