import { Config } from '../Interfaces/Config';

/**
 * 
 * @param bundleConfig 
 */
 const __handleErrors = (bundleConfig: Config): void => {
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
}

export { __handleErrors };