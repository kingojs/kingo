import { API } from './API';
import { Event } from './Event';
import { Config } from './Config';
import { existsSync, readdirSync, readFileSync } from 'fs';

/**
 * 
 * @param bundleConfig 
 */
const __handleErrors = (bundleConfig: Config): void => {
    const collectionName = bundleConfig.root.split('/').slice(-1)[0];

    if (collectionName === undefined || collectionName === null || typeof collectionName !== 'string') {
        throw new Error('Proper root was not provided');
    }

    if (Array.isArray(bundleConfig.APIS) && bundleConfig.APIS.length < 1) {
        throw new Error('Proper array was not provided');
    }

    if (!Array.isArray(bundleConfig.APIS) && bundleConfig.APIS !== '*') {
        throw new Error('Start (*) not provided');
    }
}

const __createItem = (bundleConfig: Config, api: API, path: string) => {
    // Check if API folder exists
    if (existsSync(path)) {
        const urlPath = `${path}/${bundleConfig.prefixes.url}.json`;
        const prPath = `${path}/${bundleConfig.prefixes.pr}.js`;
        const bodyPath = `${path}/${bundleConfig.prefixes.body}.json`;
        const docsPath = `${path}/${bundleConfig.prefixes.docs}.md`;
        const testsPath = `${path}/${bundleConfig.prefixes.tests}.js`;
        const variablesPath = `${path}/${bundleConfig.prefixes.variables}.json`;

        if (existsSync(urlPath)) {
            console.log(urlPath);
        }

        if (existsSync(prPath)) {
            const script = readFileSync(prPath, 'utf-8');

            const event: Event = {
                listen: "prerequest",
                script: {
                    type: "text/javascript",
                    exec: script.split('\r\n')
                }
            };

            api.event.push(event);
        }

        if (existsSync(bodyPath)) {
            console.log(bodyPath);
        }

        if (existsSync(docsPath)) {
            const markdown = readFileSync(docsPath, 'utf-8');
            api.description = markdown;
        }

        if (existsSync(testsPath)) {
            const tests = readFileSync(testsPath, 'utf-8');

            const event: Event = {
                listen: "test",
                script: {
                    type: "text/javascript",
                    exec: tests.split('\r\n')
                }
            };

            api.event.push(event);
        }

        if (existsSync(variablesPath)) {
            console.log(variablesPath);
        }
    }
}

/**
 * 
 * @param bundleConfig 
 */
const __createTree = (bundleConfig: Config): void => {
    const collectionName = bundleConfig.root.split('/').slice(-1)[0];

    const collection = {
        info: {
            name: collectionName,
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        item: [] as API[]
    };

    // __saveFiles(bundleConfig, fileTree, bundleConfig.root);

    // Log each API given in APIs array
    for (const apiName of bundleConfig.APIS) {
        const api: API = {
            name: apiName,
            item: [] as object[],
            event: [] as Event[],
            description: undefined as string
        };

        // Build API path
        const apiPath = `${bundleConfig.root}/${apiName}`;

        __createItem(bundleConfig, api, apiPath);

        // Push API into array of APIs
        collection.item.push(api);
    }

    console.log(JSON.stringify(collection));
    console.log(collection);
}

export { __createTree, __handleErrors };