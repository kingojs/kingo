import { Config } from './Interfaces/Config';
/**
 * Creates a Postman collection from scripts, JSONs, and
 * markdown files in source folder.
 *
 * @param bundleConfig configuration needed by Kingo in
 * order to run.
 */
declare const kingonize: (bundleConfig: Config) => void;
export { kingonize };
