import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from 'node:process';
import showCurrentDirectory from './showCurrentDirectory.js';

export default async function fsAdd(newFileName){
    try {
        await writeFile(
            join(cwd(), newFileName),
            '',
            { flag: 'ax'}
        );
    } catch {
        process.stdout.write('Operation failed\n');
    } finally {
        showCurrentDirectory();
    }
};