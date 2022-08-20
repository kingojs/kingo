"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__writeCollection = void 0;
const fs_1 = require("fs");
const __writeCollection = (collection) => {
    const date = new Date();
    const collectionName = `./kingo-${date.toISOString().split('.')[0].replaceAll(':', '-')}.json`;
    (0, fs_1.writeFileSync)(collectionName, JSON.stringify(collection, null, 4));
};
exports.__writeCollection = __writeCollection;
//# sourceMappingURL=__writeCollection.js.map