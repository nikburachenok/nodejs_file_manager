import os from 'node:os';
import showCurrentDirectory from './showCurrentDirectory.js';

export default async function getOsInfo([commandName]) {
    if (commandName === '--EOL') {
        process.stdout.write(`${JSON.stringify(os.EOL)}\n`);
    } else if (commandName === '--cpus') {
        console.table(
            os.cpus().map(item => {
                return {
                    Model: item.model,
                    Speed: `${Math.round(item.speed / 10)/ 100}GHz`
                };
            })
        );
    } else if (commandName === '--homedir') {
        process.stdout.write(`${os.homedir()}\n`);
    } else if (commandName === '--username') {
        process.stdout.write(`${os.userInfo().username}\n`);
    } else if (commandName === '--architecture') {
        process.stdout.write(`${os.arch()}\n`);
    } else {
        process.stdout.write('Invalid input\n');
        showCurrentDirectory();
    }
}