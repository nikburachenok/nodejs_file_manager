import { cwd } from 'process';

export default function showCurrentDirectory() {
    process.stdout.write(`You are currently in ${cwd()}\n`);
}