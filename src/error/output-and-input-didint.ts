export class BadCommand extends Error {
    constructor(public message: string) {
        super(message);
    }
}
