import { unlink } from "node:fs/promises";
import { stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import showCurrentDirectory from './showCurrentDirectory.js';

export default async function fsRemove(params){
    try {
        if (!(await stat(resolve(params[0]))).isFile()) {
            throw new Error('It is not a file');
        };
        await unlink(resolve(params[0]));
    } catch {
        process.stdout.write('Operation failed\n');
    } finally {
        showCurrentDirectory();
    }
};