import { pipeline } from 'node:stream/promises';
import { stat } from 'node:fs/promises';
import { parse, resolve } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import showCurrentDirectory from './showCurrentDirectory.js';

export default async function fsCopy(params){
    try {
        let targetPath = resolve(params[0]);
        if (!(await stat(targetPath)).isFile()) {
            throw new Error('It is not a file');
        }
        if (!(await stat(resolve(params[1]))).isDirectory()) {
            throw new Error('It is not a directory');
        }

        let newPath = resolve(params[1], parse(targetPath).base);

        if (parse(targetPath).dir == parse(newPath).dir) {
            throw new Error('Illegal operation');
        }
        const readableStream = createReadStream(targetPath);
        const writableStream = createWriteStream(newPath);
        await pipeline(readableStream, writableStream);
    } catch {
        process.stdout.write('Operation failed\n');
    } finally {
        showCurrentDirectory();
    }
};