import { createHash } from 'node:crypto';
import fs from 'node:fs';
import { join } from "node:path";
import { cwd } from 'node:process';
import showCurrentDirectory from './showCurrentDirectory.js';

export default async function calculateHash([pathToFile]) {
    if (fs.existsSync(pathToFile)) {
        launchReadStream(pathToFile);
    } else if (fs.existsSync(join(cwd(), pathToFile))) {
        launchReadStream(join(cwd(), pathToFile));
    } else {
        process.stdout.write('Operation failed\n');
        showCurrentDirectory();
    }
};

function launchReadStream(filePath) {
    const readableStream = fs.createReadStream(filePath, 'utf-8');

    let result = '';
    readableStream.on('error', function (__) {
        process.stdout.write('Operation failed\n');
    });
    readableStream.on('data', (chunk) => {
        result += chunk;
    });
    readableStream.on('end', () => {
        process.stdout.write(`${createHash('sha256').update(result).digest('hex')}\n`);
    });
    readableStream.on('close', () => {
        showCurrentDirectory();
    });
}