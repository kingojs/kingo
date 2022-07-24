interface Event {
    listen: string;
    script: {
        type: string;
        exec: string[]
    }
};

export { Event };