import { Prefixes } from './Prefixes'

/**
 * This is the required configuration to be able to execute
 * Kingo.
 * 
 * @interface Config
 * @root {string} collection base path
 * @apis {string[] | "*"} array containing the desired APIs
 * @prefixes {Prefixes} file name for each feature
 */
interface Config {
    root: string;
    APIS: string[] | "*";
    prefixes: Prefixes;
}

export { Config };