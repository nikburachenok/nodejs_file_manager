import fs from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, parse } from 'node:path';
import { cwd } from 'node:process';
import zlib from 'node:zlib';
import showCurrentDirectory from './showCurrentDirectory.js';

export default async function compress([targetPath, destinationPath]) {
    try {
        let fileToArchivePath = resolve(cwd(), targetPath);
        if (!(await stat(fileToArchivePath)).isFile()) {
            throw new Error('It is not a file');
        }
        if (!(await stat(resolve(destinationPath))).isDirectory()) {
            throw new Error('It is not a directory');
        }
        let archivedFilePath = resolve(cwd(), destinationPath, `${parse(fileToArchivePath).base}.br`);
        const readStream = fs.createReadStream(fileToArchivePath);
        const writeStream = fs.createWriteStream(archivedFilePath);

        const brotli = zlib.createBrotliCompress();
        const stream = readStream.pipe(brotli).pipe(writeStream);

        stream.on('error', () => {
            process.stdout.write('Operation failed\n');
        });
        stream.on('close', () => {
            showCurrentDirectory();
        })
    } catch {
        process.stdout.write('Operation failed\n');
        showCurrentDirectory();
    }
}