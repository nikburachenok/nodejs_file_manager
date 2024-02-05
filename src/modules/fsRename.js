import { rename } from "node:fs/promises";
import { stat } from 'node:fs/promises';
import { resolve, parse } from "node:path";
import showCurrentDirectory from './showCurrentDirectory.js';

export default async function fsRename(params) {
    try {
        let targetPath = resolve(params[0]);
        if (!(await stat(targetPath)).isFile()) {
            throw new Error('It is not a file');
        }

        let newPath = resolve(parse(targetPath).dir, params[1]);
        await rename(targetPath, newPath);
    } catch {
        process.stdout.write('Operation failed\n');
    } finally {
        showCurrentDirectory();
    }
};