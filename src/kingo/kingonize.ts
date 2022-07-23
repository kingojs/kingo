import { Config } from './Config'
import { __handleErrors, __createTree } from './Utils'

/**
 * Creates a Postman collection from scripts, JSONs, and
 * markdown files in source folder.
 * 
 * @param bundleConfig configuration needed by Kingo in
 * order to run.
 */
const __kingonize = (bundleConfig: Config): void => {
    __handleErrors(bundleConfig)
    __createTree(bundleConfig)
}

export { __kingonize }