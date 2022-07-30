"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__handleErrors = void 0;
/**
 *
 * @param bundleConfig
 */
const __handleErrors = (bundleConfig) => {
    const collectionName = bundleConfig.root.split('/').slice(-1)[0];
    if (collectionName === undefined || collectionName === null || typeof collectionName !== 'string') {
        throw new Error('Proper root was not provided');
    }
    if (Array.isArray(bundleConfig.APIS) && bundleConfig.APIS.length < 1) {
        throw new Error('Proper array was not provided');
    }
    if (!Array.isArray(bundleConfig.APIS) && bundleConfig.APIS !== '*') {
        throw new Error('Start (*) not provided');
    }
};
exports.__handleErrors = __handleErrors;
//# sourceMappingURL=__handleErrors.js.map