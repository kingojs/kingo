"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__createAPI = void 0;
const fs_1 = require("fs");
const __createTestCase_1 = require("./__createTestCase");
const __createAPI = (bundleConfig, api, apiPath) => {
    // Check if API folder exists
    if ((0, fs_1.existsSync)(apiPath)) {
        const prPath = `${apiPath}/${bundleConfig.prefixes.prerequestScript}.js`;
        const docsPath = `${apiPath}/${bundleConfig.prefixes.documentation}.md`;
        const testsPath = `${apiPath}/${bundleConfig.prefixes.tests}.js`;
        // In case the API has some documentation, add it to it.
        if ((0, fs_1.existsSync)(docsPath)) {
            const markdown = (0, fs_1.readFileSync)(docsPath, 'utf-8');
            api.description = markdown;
        }
        // Pre-resquest scripts should come before
        // test scripts.
        if ((0, fs_1.existsSync)(prPath)) {
            const script = (0, fs_1.readFileSync)(prPath, 'utf-8');
            const event = {
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
        if ((0, fs_1.existsSync)(testsPath)) {
            const tests = (0, fs_1.readFileSync)(testsPath, 'utf-8');
            const event = {
                listen: "test",
                script: {
                    type: "text/javascript",
                    exec: tests.split('\r\n')
                }
            };
            api.event.push(event);
        }
    }
    const files = (0, fs_1.readdirSync)(apiPath);
    for (const file of files) {
        if (file[0] !== '.') {
            const filePath = `${apiPath}/${file}`;
            const stat = (0, fs_1.statSync)(filePath);
            if (stat.isDirectory()) {
                (0, __createTestCase_1.__createTestCase)(bundleConfig, api, apiPath, file);
            }
        }
    }
};
exports.__createAPI = __createAPI;
//# sourceMappingURL=__createAPI.js.map