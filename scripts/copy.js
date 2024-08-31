import fs from 'node:fs/promises';
import process from 'node:process';
import { Log } from './color-cli.js';

const SRC = process.env.outDir || './dist/static';
const DST = process.env.destDir || '../src/main/resources/webroot';

try {
    const stat = await fs.cp(SRC, DST, {recursive: true});
    console.log(Log.green(`✓ Frontend copied to ${DST}`));
} catch (error) {
    console.error(Log.red(error.message));
}
