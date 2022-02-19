import { AssertionError } from 'chai';
import fs from 'fs/promises';
import { DIGIT_HEIGHT, DIGIT_WIDTH } from './config';
import { numberToOcrReference } from './number-to-ocr-reference';

export const parse = async (pathToFile: string): Promise<string> => {
    try {
        return await fs.readFile(pathToFile, { encoding: 'utf-8' });
    } catch (error) {
        throw new NoSuchFileOrDirectory('file does not exist');
    }
};

export const extractDigit = (fileContent: string[], startIndex: number) => {
    let str = '\n';
    for (let i = 0; i < DIGIT_HEIGHT; i += 1) {
        str += fileContent[i].slice(startIndex, DIGIT_WIDTH + startIndex);
        str += '\n';
    }
    return str;
};

export const extractEntry = (fileContent: string[], indexLine: number) => {
    const start = DIGIT_HEIGHT * indexLine;
    return fileContent.slice(start, start + DIGIT_HEIGHT);
};

export const parseCodesFromFile = async (path: string): Promise<number[][]> => {
    const fileContent = (await parse(path)).split('\n');
    const numberEntries = fileContent.length / DIGIT_HEIGHT;
    const codesFromFile: number[][] = [];

    for (let e = 0; e < numberEntries; e++) {
        const entry = extractEntry(fileContent, e);
        const codeFromLine: number[] = [];
        for (let i = 0; i < 9; i += 1) {
            const res = extractDigit(entry, DIGIT_WIDTH * i);
            const number = numberToOcrReference.get(res);
            if (typeof number === 'undefined') {
                throw new AssertionError(`${res} has no results`);
            }
            codeFromLine.push(number);
        }
        codesFromFile.push(codeFromLine);
    }

    return codesFromFile;
};

export class NoSuchFileOrDirectory extends Error {
    constructor(public message: string) {
        super(message);
    }
}
