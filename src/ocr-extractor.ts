import { Parser } from "./parser";
import { codeToResultFormat } from "./classify-file";

export class OcrExtractor {
    private parser: Parser;

    constructor(parser: Parser) {
        this.parser = parser;
    }

    async extract(content: string[]): Promise<string[][]> {
        const outputs: string[][] = [];

        for (let i = 0; i < content.length; i++) {
            const codes = this.parser.extractCodes(content[i]);
            outputs.push(codes.map((code) => codeToResultFormat(code)));
        }
        return outputs;
    }
}