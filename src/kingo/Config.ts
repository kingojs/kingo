import { Prefixes } from './Prefixes'

interface Config {
    root: string;
    APIS: string[] | "*";
    prefixes: Prefixes;
}

export { Config };