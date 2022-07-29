import { API } from "../Interfaces/API";
import { Event } from '../Interfaces/Event';
import { Config } from "../Interfaces/Config";
import { Request } from '../Interfaces/Request';
import { existsSync, readFileSync } from 'fs';

const __createTestCase = (config: Config, api: API, apiPath: string, testCaseName: string): void => {
    const prPath = `${apiPath}/${testCaseName}/${config.prefixes.pr}.js`;
    const testsPath = `${apiPath}/${testCaseName}/${config.prefixes.tests}.js`;
    const urlPath = `${apiPath}/${testCaseName}/${config.prefixes.url}.json`;
    const bodyPath = `${apiPath}/${testCaseName}/${config.prefixes.body}.json`;

    // Create a "Test Case" object
    const tc = {
        event: [] as Event[],
        name: testCaseName,
        request: {} as Request
    };

    // Create "Request" object
    const request: Request = {
        method: undefined as string,
        url: {
            raw: undefined as string,
            host: [] as string[]
        },
        body: {
            mode: undefined as string,
            raw: undefined as string,
            options: {
                raw: {
                    language: undefined as string
                }
            }
        }
    }

    if (existsSync(urlPath)) {
        // Raw file
        const urlFile = readFileSync(urlPath, 'utf-8');

        // Parsed URL file
        const urlJSON = JSON.parse(urlFile);

        // Create "Request" object
        request.method = urlJSON.method;
        request.url.raw = urlJSON.request_url;
        request.url.host.push(urlJSON.request_url);
    }

    if (existsSync(bodyPath)) {
        // Raw file
        const bodyFile = readFileSync(bodyPath, 'utf-8');
        request.body.mode = "raw";
        request.body.raw = bodyFile;
        request.body.options.raw.language = "json";
    }

    if (existsSync(prPath)) {
        // Read script from the pre-request file
        const script = readFileSync(prPath, 'utf-8');
    
        // Create an "Event" object
        const event: Event = {
            listen: "prerequest",
            script: {
                type: "text/javascript",
                exec: script.split('\r\n')
            }
        };

        // Push the event into the events array
        tc.event.push(event);
    }

    if (existsSync(testsPath)) {
        // Read script from the pre-request file
        const script = readFileSync(testsPath, 'utf-8');
    
        // Create an "Event" object
        const event: Event = {
            listen: "test",
            script: {
                type: "text/javascript",
                exec: script.split('\r\n')
            }
        };

        // Push the event into the events array
        tc.event.push(event);
    }

    // Push the request into the test case
    tc.request = request;

    // Push the "Test Case" object into the
    // items array
    api.item.push(tc);
}

export { __createTestCase };