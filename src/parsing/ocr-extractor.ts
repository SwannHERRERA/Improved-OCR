import { Parser } from './parser';
import { CodeToResult } from '../validation/code-to-result';

export class OcrExtractor {
    private parser: Parser;
    private codeToResult: CodeToResult;

    constructor(parser: Parser, codeToResult: CodeToResult) {
        this.parser = parser;
        this.codeToResult = codeToResult;
    }

    async extract(content: string[]): Promise<string[][]> {
        const filesContent: string[][] = [];

        for (let i = 0; i < content.length; i++) {
            const codes = this.parser.extractCodes(content[i]);
            filesContent.push(codes.map((code) => this.codeToResult.format(code)));
        }
        return filesContent;
    }
}
