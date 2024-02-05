import { chdir, cwd } from 'node:process';
import { resolve } from 'node:path';
import showCurrentDirectory from './showCurrentDirectory.js';

export default async function fsCd(params) {
    try {
        chdir(resolve(cwd(), params[0]));
    } catch {
        process.stdout.write('Operation failed\n');
    } finally {
        showCurrentDirectory();
    }
};