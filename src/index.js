import readline from 'node:readline/promises';
import { homedir } from 'node:os';
import {
    stdin as input,
    stdout as output,
    chdir
} from 'node:process';

import showCurrentDirectory from './modules/showCurrentDirectory.js';
import fsList from './modules/fsList.js';
import fsUp from './modules/fsUp.js';
import fsCd from './modules/fsCd.js';
import fsReadFile from './modules/fsReadFile.js';
import fsAdd from './modules/fsAdd.js';
import fsRename from './modules/fsRename.js';
import fsCopy from './modules/fsCopy.js';
import fsMove from './modules/fsMove.js';
import fsRemove from './modules/fsRemove.js';
import getOsInfo from './modules/osInfo.js';
import calculateHash from './modules/hashCalculation.js';
import compress from './modules/compress.js';
import decompress from './modules/decompress.js';

const rl = readline.createInterface({ input, output });
chdir(homedir());
let userName = 'Unknown User';
let arg = process.argv.find(item => item.includes('--username'));
if (arg) {
    userName = arg.slice(11);
}
output.write(`Welcome to the File Manager, ${userName}!\n`);
showCurrentDirectory()

rl.on('line', async (input) => {
    let [commandName, ...params] = input.trim().split(' ').filter(item => item);
    if (commandName === '.exit') {
        rl.close();
    } else if (commandName === 'up' && !params.length) {
        await fsUp();
    } else if (commandName === 'cd' && params.length === 1) {
        await fsCd(params);
    } else if (commandName === 'ls' && !params.length) {
        await fsList();
    } else if (commandName === 'cat' && params.length === 1) {
        await fsReadFile(params[0]);
    } else if (commandName === 'add' && params.length === 1) {
        await fsAdd(params[0]);
    } else if (commandName === 'rn' && params.length === 2) {
        await fsRename(params);
    } else if (commandName === 'cp' && params.length === 2) {
        await fsCopy(params);
    } else if (commandName === 'mv' && params.length === 2) {
        await fsMove(params);
    } else if (commandName === 'rm' && params.length === 1) {
        await fsRemove(params);
    } else if (commandName === 'os' && params.length === 1) {
        await getOsInfo(params);
    } else if (commandName === 'hash' && params.length === 1) {
        await calculateHash(params);
    } else if (commandName === 'compress' && params.length === 2) {
        await compress(params);
    } else if (commandName === 'decompress' && params.length === 2) {
        await decompress(params);
    } else {
        output.write('Invalid input\n');
        showCurrentDirectory();
    }
});

rl.on('close', () => {
    output.write(`Thank you for using File Manager, ${userName}, goodbye!\n`);
});