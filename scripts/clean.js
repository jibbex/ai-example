import fs from 'node:fs/promises';
import process from 'node:process';
import { Log } from './color-cli.js';

const PATH = process.env.outDir || './dist'

try {
    await fs.rm(PATH, { recursive: true });
    console.log(Log.green(`✓ Cleaned`));
} catch (error) {
    console.error(Log.red(error.message));
}