import { Config } from './Interfaces/Config'
import { __createCollection } from './utilities/__createCollection'

/**
 * Creates a Postman collection from scripts, JSONs, and
 * markdown files in source folder.
 * 
 * @param bundleConfig configuration needed by Kingo in
 * order to run.
 */
const kingonize = (bundleConfig: Config): void => {
    __createCollection(bundleConfig)
}

export { kingonize }