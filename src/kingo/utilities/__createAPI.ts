import { API } from '../Interfaces/API';
import { Event } from '../Interfaces/Event';
import { Config } from '../Interfaces/Config';
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { __createTestCase } from './__createTestCase';

const __createAPI = (bundleConfig: Config, api: API, apiPath: string): void => {
    // Check if API folder exists
    if (existsSync(apiPath)) {
        const prPath = `${apiPath}/${bundleConfig.prefixes.prerequestScript}.js`;
        const docsPath = `${apiPath}/${bundleConfig.prefixes.documentation}.md`;
        const testsPath = `${apiPath}/${bundleConfig.prefixes.tests}.js`;
        const authPath = `${apiPath}/${bundleConfig.prefixes.auth}.json`;

        // In case the API has some documentation, add it to it.
        if (existsSync(docsPath)) {
            const markdown = readFileSync(docsPath, 'utf-8');
            api.description = markdown;
        }

        // Pre-resquest scripts should come before
        // test scripts.
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

        // Test scripts come after the pre-request, actually,
        // the order doesn't matter to Postman, but just to
        // have some human logical approach.
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

        // Authorization config will be read from the JSON file and appended at API level
        if (existsSync(authPath)) {
            // { "type": "awsv4", "secretKey": "QWERTY", "accessKey": "QWERTY" }
            const authConfig = readFileSync(authPath, 'utf-8');
            const authJSON = JSON.parse(authConfig);
            const authType = authJSON.type;

            // Build auth object
            const auth = {
                type: authType,
                authType: undefined as object[]
            }

            const authProps = [] as object[];

            // Build auth array content
            for (const key in authJSON) {
                // skip key since it was already taken
                if (key !== 'type') {
                    const temporalObj = {
                        "key": key,
                        "value": authJSON[key],
                        "type": typeof authJSON[key]
                    }

                    authProps.push(temporalObj);
                }
            }

            auth.authType = authProps;

            api.auth = auth;
        }
    }

    const files = readdirSync(apiPath);

    for (const file of files) {
        if (file[0] !== '.') {
            const filePath = `${apiPath}/${file}`;
            const stat = statSync(filePath);

            if (stat.isDirectory()) {
                __createTestCase(bundleConfig, api, apiPath, file);
            }
        }
    }
}

export { __createAPI };