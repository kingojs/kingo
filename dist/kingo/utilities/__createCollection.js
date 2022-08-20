"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__createCollection = void 0;
const fs_1 = require("fs");
// Utilities
const __createAPI_1 = require("./__createAPI");
const __handleErrors_1 = require("./__handleErrors");
const __writeCollection_1 = require("./__writeCollection");
/**
 *
 * @param bundleConfig
 */
const __createCollection = (bundleConfig) => {
    // Try to handle as many errors as possible
    // at the beginning of the execution.
    (0, __handleErrors_1.__handleErrors)(bundleConfig);
    // Extract collection name
    const collectionName = bundleConfig.root.split('/').slice(-1)[0];
    // Create collection base object
    const collection = {
        info: {
            name: collectionName,
            schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
            description: undefined
        },
        item: [],
        event: [],
        variable: []
    };
    // Log each API given in APIs array
    for (const apiName of bundleConfig.APIS) {
        const api = {
            name: apiName,
            item: [],
            event: [],
            description: undefined
        };
        // Build API path
        const apiPath = `${bundleConfig.root}/${apiName}`;
        // Create API object and push it into the collection
        (0, __createAPI_1.__createAPI)(bundleConfig, api, apiPath);
        // Push API into array of APIs
        collection.item.push(api);
    }
    // Append description, pre-request script, and variables.
    const docsPath = `${bundleConfig.root}/${bundleConfig.prefixes.documentation}.md`;
    const prPath = `${bundleConfig.root}/${bundleConfig.prefixes.prerequestScript}.js`;
    const testsPath = `${bundleConfig.root}/${bundleConfig.prefixes.tests}.js`;
    const variablesPath = `${bundleConfig.root}/${bundleConfig.prefixes.variables}.json`;
    if ((0, fs_1.existsSync)(docsPath)) {
        const markdown = (0, fs_1.readFileSync)(docsPath, 'utf-8');
        collection.info.description = markdown;
    }
    if ((0, fs_1.existsSync)(prPath)) {
        const script = (0, fs_1.readFileSync)(prPath, 'utf-8');
        const event = {
            listen: "prerequest",
            script: {
                type: "text/javascript",
                exec: script.split('\r\n')
            }
        };
        collection.event.push(event);
    }
    if ((0, fs_1.existsSync)(testsPath)) {
        const tests = (0, fs_1.readFileSync)(testsPath, 'utf-8');
        const event = {
            listen: "test",
            script: {
                type: "text/javascript",
                exec: tests.split('\r\n')
            }
        };
        collection.event.push(event);
    }
    if ((0, fs_1.existsSync)(variablesPath)) {
        const variables = (0, fs_1.readFileSync)(variablesPath, 'utf-8');
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
    (0, __writeCollection_1.__writeCollection)(collection);
};
exports.__createCollection = __createCollection;
//# sourceMappingURL=__createCollection.js.map