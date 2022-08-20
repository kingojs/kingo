import { writeFileSync } from 'fs';

const __writeCollection = (collection: object) => {
    const date = new Date();
    const collectionName = `./kingo-${date.toISOString().split('.')[0].replaceAll(':', '-')}.json`;
    writeFileSync(collectionName, JSON.stringify(collection, null, 4));
}

export { __writeCollection };