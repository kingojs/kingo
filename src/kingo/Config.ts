import { Prefixes } from './Prefixes'

interface Config {
    prefixes: Prefixes;
    collection: string;
    APIS: string[] | "*";
}

export { Config };