import fs from 'node:fs/promises';
import process from 'node:process';
import os from 'node:os';
import { Helmet } from 'react-helmet';
import { Log } from './color-cli.js';

const path = process.env.outDir || `${process.cwd()}/dist`;
// Required for ESM module import on windows with an absolute path
const root = os.type() === 'Windows_NT' ? 'file://' : '';
const PATH = process.env.outDir || `${root}${process.cwd()}/dist`;
// Indicates if the build should render to static markup or not
const IS_STATIC_BUILD = process.argv.includes('--static');



const createHead = helmet => 
    `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`;

try {
    const module = await import(`${PATH}/server/entry-server.js`);
    const render = module[IS_STATIC_BUILD ? 'renderStatic' : 'render'];
    const markup = render();
    const helmet = Helmet.renderStatic();
    const index = await fs.readFile(`${path}/client/index.html`, 'utf-8');

    let html = index.replace('<!--outlet-->', markup);
    html = html.replace('<!--head-->', createHead(helmet));
    html = html.replace('><!--attr-->', ' ' + helmet.htmlAttributes.toString() + '>');

    await fs.cp(`${path}/client`, `${path}/static/`, { recursive: true });
    await fs.rm(`${path}/static/index.html`);
    await fs.writeFile(`${path}/static/index.html`, html);
    console.log(Log.green('✓ Pre-rendering of Landing Page done'))
} catch (error) {
    console.error(Log.red('ERROR: %s') + '\n%s', error.message, error.stack);
}