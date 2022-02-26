export class NoSuchFileOrDirectory extends Error {
    constructor(public message: string) {
        super(message);
    }
}