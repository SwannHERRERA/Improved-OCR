import fs from 'fs/promises';
import { DIGIT_HEIGHT, DIGIT_WIDTH } from './config';
import { OcrReferenceToNumber } from './number-to-ocr-reference';

export class Parser {
    private contentParse: string;
    private digitWidth: number;
    private digitHeight: number;

    constructor(contentParse: string, digitWidth: number, digitHeight: number) {
        this.contentParse = contentParse;
        this.digitHeight = digitHeight;
        this.digitWidth = digitWidth;
    }

    public async extractCodes(): Promise<number[][]> {
        const contentLines = this.contentParse.split('\n');
        const numberEntries = contentLines.length / this.digitHeight;
        const codesFromFile: number[][] = [];

        for (let e = 0; e < numberEntries; e++) {
            const entry = this.extractEntry(contentLines, e);
            const codeFromLine: number[] = [];
            for (let i = 0; i < 9; i += 1) {
                const res = this.extractDigit(entry, this.digitWidth * i);
                const number = OcrReferenceToNumber.get(res) ?? -1;

                codeFromLine.push(number);
            }
            codesFromFile.push(codeFromLine);
        }

        return codesFromFile;
    }

    private extractEntry(fileContent: string[], indexLine: number): string[] {
        const start = DIGIT_HEIGHT * indexLine;
        return fileContent.slice(start, start + DIGIT_HEIGHT);
    }

    private extractDigit(fileContent: string[], startIndex: number): string {
        let str = '\n';
        for (let i = 0; i < DIGIT_HEIGHT; i += 1) {
            str += fileContent[i].slice(startIndex, DIGIT_WIDTH + startIndex);
            str += '\n';
        }
        return str;
    }
}

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

export const parseCodesFromFile = async (path: string): Promise<string[]> => {
    const fileContent = (await parse(path)).split('\n');
    const numberEntries = fileContent.length / DIGIT_HEIGHT;
    const codesFromFile: string[] = [];

    for (let e = 0; e < numberEntries; e++) {
        const entry = extractEntry(fileContent, e);
        let codeFromLine = '';
        for (let i = 0; i < 9; i += 1) {
            const res = extractDigit(entry, DIGIT_WIDTH * i);
            const number = OcrReferenceToNumber.get(res);
            if (typeof number === 'undefined') {
                codeFromLine += '?';
            } else {
                codeFromLine += number.toString();
            }
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
