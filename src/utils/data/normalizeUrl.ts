import isAbsolutePath from '@/utils/isAbsolutePath';
import config from '@/config';

export default function normalizeUrl(input?: string): string | undefined {
    return input
        ? isAbsolutePath(input)
            ? input
            : `${ config.dataBaseUrl }${ input }`
        : input;
}
