import { Config } from './Config'
import { existsSync, readdirSync } from 'fs'

/**
 * 
 * @param bundleConfig 
 */
const __handleErrors = (bundleConfig: Config): void => {
    const collectionName = bundleConfig.root.split('/').slice(-1)[0]

    if (collectionName === undefined || collectionName === null || typeof collectionName !== 'string') {
        throw new Error('Proper root was not provided')
    }

    if (Array.isArray(bundleConfig.APIS) && bundleConfig.APIS.length < 1) {
        throw new Error('Proper array was not provided')
    }

    if (!Array.isArray(bundleConfig.APIS) && bundleConfig.APIS !== '*') {
        throw new Error('Start (*) not provided')
    }
}

const __saveFiles = (bundleConfig: Config, fileTree: object, path: string) => {
    // Check if API folder exists
    if (existsSync(path)) {
        const urlPath = `${path}/${bundleConfig.prefixes.url}.json`
        const prPath = `${path}/${bundleConfig.prefixes.pr}.js`
        const bodyPath = `${path}/${bundleConfig.prefixes.body}.json`
        const docsPath = `${path}/${bundleConfig.prefixes.docs}.md`
        const testsPath = `${path}/${bundleConfig.prefixes.tests}.js`
        const variablesPath = `${path}/${bundleConfig.prefixes.variables}.json`

        if (existsSync(urlPath)) {
            console.log(urlPath)
        }

        if (existsSync(prPath)) {
            console.log(prPath)
        }

        if (existsSync(bodyPath)) {
            console.log(bodyPath)
        }

        if (existsSync(docsPath)) {
            console.log(docsPath)
        }

        if (existsSync(testsPath)) {
            console.log(testsPath)
        }

        if (existsSync(variablesPath)) {
            console.log(variablesPath)
        }
    }
}

/**
 * 
 * @param bundleConfig 
 */
const __createTree = (bundleConfig: Config): void => {
    const fileTree = {}

    __saveFiles(bundleConfig, fileTree, bundleConfig.root)

    // Log each API given in APIs array
    for (const API of bundleConfig.APIS) {
        // Build API path
        const apiPath = `${bundleConfig.root}/${API}`
        __saveFiles(bundleConfig, fileTree, apiPath)
    }
}

export { __createTree, __handleErrors }