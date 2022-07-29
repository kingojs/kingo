interface Request {
    method: string;
    body: {
        mode: string;
        raw: string;
        options: {
            raw: {
                language: string
            }
        }
    },
    url: {
        raw: string,
        host: string[];
    }
};

export { Request };