import { API } from "../Interfaces/API";
import { Event } from '../Interfaces/Event';
import { Config } from "../Interfaces/Config";
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';

const __createTestCase = (config: Config, api: API, apiPath: string, testCaseName: string): void => {
    const prPath = `${apiPath}/${testCaseName}/${config.prefixes.pr}.js`;
    const testsPath = `${apiPath}/${testCaseName}/${config.prefixes.tests}.js`;

    // Create a "Test Case" object
    const tc = {
        event: [] as Event[],
        name: testCaseName
    };

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

    // Push the "Test Case" object into the
    // items array
    api.item.push(tc);
}

export { __createTestCase };