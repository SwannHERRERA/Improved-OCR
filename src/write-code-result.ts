import { computeChecksumValue, validCheckSum } from './checksum';
import { parse, Parser } from './parser';
import { Writer } from './writer/writer';
import { WriterInFile } from './writer/writer-in-file';

export const codeToResultFormat = (code: string): string => {
    if (code.includes('?')) return code + ' ILL';
    return validCheckSum(computeChecksumValue(code)) ? code : code + ' ERR';
};

// Authorized contient tous les checksums valides
// Errored contient tous les checksums invalides
// Unknown contient tous les checksums illisibles

export class ClassifySingle implements Classify {
    private parser: Parser;
    private outputFiles: string[];

    constructor(parser: Parser, outputFiles: string[]) {
        this.parser = parser;
        this.outputFiles = outputFiles;
    }
    public async write(paths: string[]) {
        for (let index = 0; index < paths.length; index++) {
            const content = await parse(paths[index]);
            const codes = this.parser.extractCodes(content);
            const output = codes.map((code) => codeToResultFormat(code));
            const outputFile = this.outputFiles[index];
            const writer: Writer = new WriterInFile('w', outputFile);
            await writer.write(output);
        }
    }
}

export class ClassifyGroup implements Classify {
    private parser: Parser;
    private outputDirectory: string;

    constructor(parser: Parser, outputDirectory: string) {
        this.parser = parser;
        this.outputDirectory = outputDirectory;
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
            await this.appendResult(output);
        }
    }
    private async appendResult(lines: string[]) {
        for (const line of lines) {
            const keys = Array.from(this.errorSuffix.keys());
            for (const key of keys) {
                if (line.includes(key)) {
                    const Writer = new WriterInFile(
                        'a',
                        this.outputDirectory + this.errorSuffix.get(key)
                    );
                    await Writer.write([line]);
                    return;
                }
            }
            const Writer = new WriterInFile('a', this.outputDirectory + this.authorisedPath);
            await Writer.write([line]);
        }
    }
}

export interface Classify {
    // eslint-disable-next-line no-unused-vars
    write(paths: string[]): void;
}
