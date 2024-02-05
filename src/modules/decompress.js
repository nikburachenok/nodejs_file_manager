import fs from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, parse } from 'node:path';
import { cwd } from 'node:process';
import zlib from 'node:zlib';
import showCurrentDirectory from './showCurrentDirectory.js';

export default async function decompress([archivePath, destinationPath]) {
    try {
        let archivedFilePath = resolve(cwd(), archivePath);
        if (!parse(archivedFilePath).ext.includes('.br')) {
            throw new Error('It is not archive');
        }

        if (!(await stat(resolve(destinationPath))).isDirectory()) {
            throw new Error('It is not a directory');
        }

        let decompressedFilePath = resolve(cwd(),destinationPath,parse(archivedFilePath).name);
        const readStream = fs.createReadStream(archivedFilePath);
        const writeStream = fs.createWriteStream(decompressedFilePath);

        const brotli = zlib.createBrotliDecompress();
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