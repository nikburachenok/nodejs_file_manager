import { readdir } from 'node:fs/promises';
import { cwd } from 'node:process';
import showCurrentDirectory from './showCurrentDirectory.js';

export default async function fsList() {
    try {
        let result = (await readdir(cwd(), { withFileTypes: true })).map(item => {
            return { Name: item.name, Type: item.isFile() ? 'file' : 'directory' };
        })
        console.table(result.sort(sort));
    } catch {
        process.stdout.write('Operation failed\n');
    } finally {
        showCurrentDirectory();
    }
};

function sort(a, b){
    if (a.Type === 'directory' && b.Type !== 'directory') {
        return -1;
    }
    if (a.Type !== 'directory' && b.Type === 'directory') {
        return 1;
    }

    let nameA = a.Name.toLowerCase();
    let nameB = b.Name.toLowerCase();
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }
    return 0;
}