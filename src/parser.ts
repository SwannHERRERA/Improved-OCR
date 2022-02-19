import fs from 'fs/promises';
import { digitHeight, digitWidth } from './config';

export const parse = async (pathToFile: string): Promise<string> => {
    try {
        return await fs.readFile(pathToFile, { encoding: 'utf-8' });
    } catch (error) {
        throw new NoSuchFileOrDirectory('file does not exist');
    }
};

export const extractDigit = (fileContent: string[], startIndex: number) => {
    let str = '\n';
    for (let i = 0; i < digitHeight; i += 1) {
        str += fileContent[i].slice(startIndex, digitWidth + startIndex);
        str += '\n';
    }
    return str;
};

export class NoSuchFileOrDirectory extends Error {
    constructor(public message: string) {
        super(message);
    }
}
