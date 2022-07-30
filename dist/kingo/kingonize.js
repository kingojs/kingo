"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kingonize = void 0;
const __createCollection_1 = require("./utilities/__createCollection");
/**
 * Creates a Postman collection from scripts, JSONs, and
 * markdown files in source folder.
 *
 * @param bundleConfig configuration needed by Kingo in
 * order to run.
 */
const kingonize = (bundleConfig) => {
    (0, __createCollection_1.__createCollection)(bundleConfig);
};
exports.kingonize = kingonize;
//# sourceMappingURL=kingonize.js.map