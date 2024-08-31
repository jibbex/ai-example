import { Log } from './color-cli.js';
import process from 'node:process';
import fs from 'node:fs/promises';
import express from 'hyper-express';
import { faker } from '@faker-js/faker';

// jsonStringify requires 2x more time.
if (process.argv.includes('--perf')) {
    runPerf().then(() => process.exit(0));
}

import LiveDirectory  from 'live-directory';
import { Buffer } from 'node:buffer';
import { createServer } from 'vite';
import { Helmet } from 'react-helmet';

const PORT = process.env.PORT || 4430;
const HOST = process.env.HOST || 'localhost';
const BASE = process.env.BASE || '/';

const assets = new LiveDirectory(`./public`, {
    static: true,
    cache: {
        max_file_count: 255,
        max_file_size: 0x100000,
    }
});

const src = new LiveDirectory(`./src`, {
    static: true,
    cache: {
        max_file_count: 255,
        max_file_size: 0x100000,
    }
});

const createHead = helmet => 
    `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`;


const app = new express.Server({
    key_file_name: 'server/cert/key.pem',
    cert_file_name: 'server/cert/cert.pem', 
});

const vite = await createServer({
    server: {
        middlewareMode: true,
    },
    appType: 'custom',
});

app.use(vite);

app.get(BASE.concat('*'), async (req, res) => {
    const url = req.originalUrl.replace(BASE, '')
    if (url === '' || url.includes('index.html')) {
        try {
            let template = await fs.readFile('index.html', 'utf-8');
            template = await vite.transformIndexHtml(url, template);

            const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
            const markup = render();
            const helmet = Helmet.renderStatic();
            let html = template.replace('<!--outlet-->', markup);
            html = html.replace('<!--head-->', createHead(helmet));
            html = html.replace('><!--attr-->', ' ' + helmet.htmlAttributes.toString() + '>');
            res.status(200).end(html);
        } catch (error) {
            res.status(500).end(error.message);
        }
    } else {
        const path = req.path; //req.path.replace('/src', '');
        const file = assets.get(path) ?? src.get(path);

        if (file === undefined) {
            console.error(`Error 404: ${path} not found`);
            return res.status(404).send();
        }

        const fileParts = file.path.split(".");
        const extension = fileParts[fileParts.length - 1];
        const content = file.content;

        if (content instanceof Buffer) {
            return res.type(extension).send(content);
        } else {
            return res.type(extension).stream(content);
        }
    }
});

try {
    await app.listen(PORT, HOST);
    console.log(`Listening on https://${HOST}:${PORT}`);
} catch (error) {
    console.error(error.message);
}

async function runPerf() {
    const randomNum = (min, max) => (
        (min, max) => Math.floor(
            Math.random() * (max - min + 0.9999) + min)
        )(Math.ceil(min), Math.floor(max)
    );


    const TRY_COUNT = 50;
    const { performance } = await import('perf_hooks');
    const jsonStringify = (await import('../src/lib/json-stringify.mjs')).default;
    
    const objs = [];
    const randomJson = () => {
        const obj = {};
        const propertyCount = randomNum(0xFFFFF, 0xFFFFF);

        for (let i = 0; i < propertyCount; i++) {
            const prop = faker.helpers.objectEntry(express);
            obj[prop[0]] = prop[1];
        }

        return obj
    }

    for (let i = 0; i < TRY_COUNT; i++) {
        objs.push(randomJson());
    } 
        const start = [];
        const end = [];
    {
        start.push(performance.now());
        const json = JSON.stringify(objs);
        end.push(performance.now());
        console.log(json);
    }

    {
        start.push(performance.now());
        const json = jsonStringify(objs);
        end.push(performance.now());
        console.log(json);
    }

    console.log(`JSON.stringify:\t${Log.yellow(`${end[0] - start[0]}ms`)}`);
    console.log(`jsonStringify:\t${Log.yellow(`${end[1] - start[1]}ms`)}`);
}
