import { gzip, gunzip } from 'zlib';
import { WithImplicitCoercion } from 'node:buffer';

export default class Compression {
    public static async compress(
        input: string | ArrayBuffer,
    ) {
        return new Promise<Buffer>((resolve, reject) => gzip(
            Buffer.from(
                input as unknown as WithImplicitCoercion<ArrayLike<number>>,
            ),
            (error, result) => {
                if (error) {
                    reject(error);

                    return;
                }

                resolve(result);
            },
        ));
    }

    public static async decompress(
        input: string | ArrayBuffer,
    ): Promise<string> {
        return new Promise<string>((resolve, reject) => gunzip(
            Buffer.from(
                input as unknown as WithImplicitCoercion<ArrayLike<number>>,
            ),
            (error, result) => {
                if (error) {
                    reject(error);

                    return;
                }

                resolve(result.toString());
            },
        ));
    }
}
