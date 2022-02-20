import { computeChecksumValue, validCheckSum } from './checksum';
import { parse, Parser } from './parser';
import { appendInFile, writeInFile } from './writer';

export const codeToResultFormat = (code: string): string => {
    if (code.includes('?')) return code + ' ILL';
    return validCheckSum(computeChecksumValue(code)) ? code : code + ' ERR';
};

// Authorized contient tous les checksums valides
// Errored contient tous les checksums invalides
// Unknown contient tous les checksums illisibles

export class ClassifySingle implements Classify {
    private parser: Parser;
    constructor(parser: Parser) {
        this.parser = parser;
    }
    public async write(paths: string[]) {
        for (const path of paths) {
            const content = await parse(path);
            const codes = this.parser.extractCodes(content);
            const output = codes.map((code) => codeToResultFormat(code));
            const outputFile = path + '.result';
            await writeInFile(outputFile, output);
        }
    }
}

export class ClassifyGroup implements Classify {
    private parser: Parser;

    constructor(parser: Parser) {
        this.parser = parser;
    }
    private errorSuffix: Map<string, string> = new Map([
        ['ILL', 'Unknown'],
        ['ERR', 'Errored'],
    ]);
    private authorisedPath = 'Authorized';

    async write(paths: string[]): Promise<void> {
        for (const path of paths) {
            const content = await parse(path);
            const codes = this.parser.extractCodes(content);
            const output = codes.map((code) => codeToResultFormat(code));
            await this.appendResult(output, 'src/fixtures/result-');
        }
    }
    private async appendResult(lines: string[], directory: string) {
        for (const line of lines) {
            const keys = Array.from(this.errorSuffix.keys());
            for (const key of keys) {
                if (line.includes(key)) {
                    await appendInFile(directory + this.errorSuffix.get(key), line);
                    return;
                }
            }
            await appendInFile(directory + this.authorisedPath, line);
        }
    }
}

interface Classify {
    // eslint-disable-next-line no-unused-vars
    write(paths: string[]): void;
}
