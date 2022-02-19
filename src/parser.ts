import fs from 'fs/promises';

export const parse = async (pathToFile: string): Promise<string> => {
    try {
        return await fs.readFile(pathToFile, { encoding: 'utf-8' });
    } catch (error) {
        throw new NoSuchFileOrDirectory('file does not exist');
    }
};

export class NoSuchFileOrDirectory extends Error {
    constructor(public message: string) {
        super(message);
    }
}
