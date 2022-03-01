import { computeChecksumValue, validCheckSum } from './checksum';
import { BadCommand } from './error/output-and-input-didint';
import { Writer } from './writer/writer';
import { WriterInFile } from './writer/writer-in-file';

export const codeToResultFormat = (code: string): string => {
    if (code.includes('?')) return code + ' ILL';
    return validCheckSum(computeChecksumValue(code)) ? code : code + ' ERR';
};

// Authorized contient tous les checksums valides
// Errored contient tous les checksums invalides
// Unknown contient tous les checksums illisibles

export class SingleClassifyFile implements ClassifyFile {
    private parsedContent: string[][];
    private outputFiles: string[];

    constructor(parsedContent: string[][], outputFiles: string[]) {
        this.parsedContent = parsedContent;
        this.outputFiles = outputFiles;
        if (outputFiles.length != parsedContent.length) {
            throw new BadCommand('the number of inputs and outputs does not match');
        }
    }

    public async write(paths: string[]) {
        for (let i = 0; i < paths.length; i++) {
            const outputFile = this.outputFiles[i];
            const writer: Writer = new WriterInFile('w', outputFile);
            await writer.write(this.parsedContent[i]);
        }
    }
}

export class GroupClasifyFile implements ClassifyFile {
    private parsedContent: string[][];
    private outputDirectory: string;

    constructor(parsedContent: string[][], outputDirectory: string) {
        this.parsedContent = parsedContent;
        this.outputDirectory = outputDirectory;
    }

    private errorsSuffix: Map<string, string> = new Map([
        ['ILL', 'Unknown'],
        ['ERR', 'Errored'],
    ]);
    private authorisedPath = 'Authorized';

    async write(paths: string[]): Promise<void> {
        for (let i = 0; i < paths.length; i++) {
            await this.appendResult(this.parsedContent[i]);
        }
    }
    private async appendResult(lines: string[]) {
        for (const line of lines) {
            const errorsSuffix = Array.from(this.errorsSuffix.keys());
            for (const errorSuffix of errorsSuffix) {
                if (line.includes(errorSuffix)) {
                    const Writer = new WriterInFile(
                        'a',
                        this.outputDirectory + this.errorsSuffix.get(errorSuffix)
                    );
                    await Writer.write([line]);
                    return;
                }
            }
            const writer = new WriterInFile('a', this.outputDirectory + this.authorisedPath);
            await writer.write([line]);
        }
    }
}

export interface ClassifyFile {
    // eslint-disable-next-line no-unused-vars
    write(paths: string[]): void;
}
