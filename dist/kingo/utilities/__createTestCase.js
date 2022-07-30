"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__createTestCase = void 0;
const fs_1 = require("fs");
const __createTestCase = (config, api, apiPath, testCaseName) => {
    const prPath = `${apiPath}/${testCaseName}/${config.prefixes.prerequestScript}.js`;
    const testsPath = `${apiPath}/${testCaseName}/${config.prefixes.tests}.js`;
    const urlPath = `${apiPath}/${testCaseName}/${config.prefixes.request}.json`;
    const bodyPath = `${apiPath}/${testCaseName}/${config.prefixes.body}.json`;
    // Create a "Test Case" object
    const tc = {
        event: [],
        name: testCaseName,
        request: {}
    };
    // Create "Request" object
    const request = {
        method: undefined,
        url: {
            raw: undefined,
            host: []
        },
        body: {
            mode: undefined,
            raw: undefined,
            options: {
                raw: {
                    language: undefined
                }
            }
        }
    };
    if ((0, fs_1.existsSync)(urlPath)) {
        // Raw file
        const urlFile = (0, fs_1.readFileSync)(urlPath, 'utf-8');
        // Parsed URL file
        const urlJSON = JSON.parse(urlFile);
        // Create "Request" object
        request.method = urlJSON.method;
        request.url.raw = urlJSON.request_url;
        request.url.host.push(urlJSON.request_url);
    }
    if ((0, fs_1.existsSync)(bodyPath)) {
        // Raw file
        const bodyFile = (0, fs_1.readFileSync)(bodyPath, 'utf-8');
        request.body.mode = "raw";
        request.body.raw = bodyFile;
        request.body.options.raw.language = "json";
    }
    if ((0, fs_1.existsSync)(prPath)) {
        // Read script from the pre-request file
        const script = (0, fs_1.readFileSync)(prPath, 'utf-8');
        // Create an "Event" object
        const event = {
            listen: "prerequest",
            script: {
                type: "text/javascript",
                exec: script.split('\r\n')
            }
        };
        // Push the event into the events array
        tc.event.push(event);
    }
    if ((0, fs_1.existsSync)(testsPath)) {
        // Read script from the pre-request file
        const script = (0, fs_1.readFileSync)(testsPath, 'utf-8');
        // Create an "Event" object
        const event = {
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
};
exports.__createTestCase = __createTestCase;
//# sourceMappingURL=__createTestCase.js.map