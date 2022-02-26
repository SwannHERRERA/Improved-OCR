export class ArgNotFound extends Error {
    constructor(public message: string) {
        super(message);
    }
}