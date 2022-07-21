import { Config } from './Config'

/**
 * Creates a Postman collection from scripts, JSONs, and
 * markdown files in source folder.
 * 
 * @param bundleConfig configuration needed by Kingo in
 * order to run.
 */
const __bundle = (bundleConfig: Config): void => {
    const collectionName = bundleConfig.root.split('/').slice(-1)[0];

    if (collectionName === undefined || collectionName === null || typeof collectionName !== 'string') {
        throw new Error('Proper root was not provided');
    }

    if (Array.isArray(bundleConfig.APIS)) {
        if (bundleConfig.APIS.length < 1) {
            throw new Error('Proper array was not provided');
        }

        console.log(`.`);
        console.log(`└── ${collectionName}`);
        console.log(`    |-- ${bundleConfig.prefixes.docs}.md`);
        console.log(`    |-- ${bundleConfig.prefixes.variables}.json`);

        for (const api of bundleConfig.APIS) {
            console.log(`    ├── ${api}`);
            console.log(`    |   |-- ${bundleConfig.prefixes.docs}.md`);
            console.log(`    |   |-- ${bundleConfig.prefixes.pr}.js`);
            console.log(`    |   |-- Test_Case_01`);
            console.log(`    |       |-- ${bundleConfig.prefixes.body}.json`);
            console.log(`    |       |-- ${bundleConfig.prefixes.tests}.js`);
        }
    }

    if (!Array.isArray(bundleConfig.APIS) && bundleConfig.APIS !== '*') {
        throw new Error('Start (*) not provided');
    }
};

export { __bundle };