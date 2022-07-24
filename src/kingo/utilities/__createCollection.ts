import { API } from '../Interfaces/API';
import { Event } from '../Interfaces/Event';
import { Config } from '../Interfaces/Config';
import { __createAPI } from './__createAPI';
import { __handleErrors } from './__handleErrors';

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
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
        },
        item: [] as API[]
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

    console.log(JSON.stringify(collection));
    console.log(collection);
}

export { __createCollection };