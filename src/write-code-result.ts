import { computeChecksumValue, validCheckSum } from './checksum';
import { parse, Parser } from './parser';
import { writeInFile } from './writer';

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

interface Classify {
    // eslint-disable-next-line no-unused-vars
    write(paths: string[]): void;
}
