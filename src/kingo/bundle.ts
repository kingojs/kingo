import { Config } from './Config'

const __bundle = (bundleConfig: Config): void => {
    console.info(`Processing collection at ${bundleConfig.root}`);

    if (Array.isArray(bundleConfig.APIS)) {
        if (bundleConfig.APIS.length < 1) {
            throw new Error('Invalid APIs array provided');
        }
    }

    if (!Array.isArray(bundleConfig.APIS) && bundleConfig.APIS !== '*') {
        throw new Error('Start (*) not provided');
    }
};

export { __bundle };