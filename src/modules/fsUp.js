import { chdir } from 'node:process'
import showCurrentDirectory from './showCurrentDirectory.js';

export default async function fsUp() {
    try {
        chdir('..')
    } catch (error) {
        console.error('Operation failed')
    } finally {
        showCurrentDirectory();
    }
}