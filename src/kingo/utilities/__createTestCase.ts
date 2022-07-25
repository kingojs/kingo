import { API } from "../Interfaces/API";

const __createTestCase = (api: API, testCaseName: string): void => {
    api.item.push({
        name: testCaseName
    });
}

export { __createTestCase };