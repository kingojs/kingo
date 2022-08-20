import { existsSync, readFileSync } from 'fs';

// Interfaces
import { API } from '../Interfaces/API';
import { Event } from '../Interfaces/Event';
import { Config } from '../Interfaces/Config';

// Utilities
import { __createAPI } from './__createAPI';
import { __handleErrors } from './__handleErrors';
import { __writeCollection } from './__writeCollection';

/**
 * 
 * @param bundleConfig 
 */
const __createCollection = (bundleConfig: Config): void => {
    // Try to handle as many errors as possible
    // at the beginning of the execution.
    __handleErrors(bundleConfig);

    // Extract collection name
    const collectionName = bundleConfig.root.split('/').slice(-1)[0];

    // Create collection base object
    const collection = {
        info: {
            name: collectionName,
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
            description: undefined as string
        },
        item: [] as API[],
        event: [] as Event[],
        variable: [] as object
    };

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

        // Create API object and push it into the collection
        __createAPI(bundleConfig, api, apiPath);

        // Push API into array of APIs
        collection.item.push(api);
    }

    // Append description, pre-request script, and variables.
    const docsPath = `${bundleConfig.root}/${bundleConfig.prefixes.documentation}.md`;
    const prPath = `${bundleConfig.root}/${bundleConfig.prefixes.prerequestScript}.js`;
    const testsPath = `${bundleConfig.root}/${bundleConfig.prefixes.tests}.js`;
    const variablesPath = `${bundleConfig.root}/${bundleConfig.prefixes.variables}.json`;

    if (existsSync(docsPath)) {
        const markdown = readFileSync(docsPath, 'utf-8');
        collection.info.description = markdown;
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

        collection.event.push(event);
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

        collection.event.push(event);
    }

    if (existsSync(variablesPath)) {
        const variables = readFileSync(variablesPath, 'utf-8');
        const varsJSON = JSON.parse(variables);
        const varsArray = [];


        for (const variable in varsJSON) {
            const varObj = {
                key: variable,
                value: varsJSON[variable],
                type: "default"
            };

            varsArray.push(varObj);
        }

        collection.variable = varsArray;
    }
    
    __writeCollection(collection);
}

export { __createCollection };