import fs from 'fs/promises';
import { NoSuchFileOrDirectory } from '../error/no-such-file-or-directory';
import { OcrReferenceToNumber } from '../number-to-ocr-reference';

export class Parser {
    private digitWidth: number;
    private digitHeight: number;
    private lineNumberDigit: number;

    constructor(digitWidth: number, digitHeight: number, lineNumberDigit: number) {
        this.digitHeight = digitHeight;
        this.digitWidth = digitWidth;
        this.lineNumberDigit = lineNumberDigit;
    }

    public extractCodes(contentParse: string): string[] {
        const fileContent = contentParse.split('\n');
        const numberEntries = fileContent.length / this.digitHeight;
        const codesFromFile: string[] = [];

        for (let e = 0; e < numberEntries; e++) {
            const entry = this.extractEntry(fileContent, e);
            let codeFromLine = '';
            for (let i = 0; i < this.lineNumberDigit; i += 1) {
                const res = this.extractDigit(entry, this.digitWidth * i);
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
    }

    private extractEntry(fileContent: string[], indexLine: number): string[] {
        const start = this.digitHeight * indexLine;
        return fileContent.slice(start, start + this.digitHeight);
    }

    private extractDigit(fileContent: string[], startIndex: number): string {
        let str = '\n';
        for (let i = 0; i < this.digitHeight; i += 1) {
            str += fileContent[i].slice(startIndex, this.digitWidth + startIndex);
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
