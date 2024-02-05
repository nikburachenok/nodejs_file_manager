import fs from 'node:fs';
import { join } from "node:path";
import { cwd } from 'node:process';
import showCurrentDirectory from './showCurrentDirectory.js';

export default async function fsReadFile(absolutePath) {
    if (fs.existsSync(absolutePath)) {
        launchReadStream(absolutePath);
    } else if (fs.existsSync(join(cwd(), absolutePath))) {
        launchReadStream(join(cwd(), absolutePath));
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
        process.stdout.write(`${result}\n`);
    });
    readableStream.on('close', () => {
        showCurrentDirectory();
    })
}