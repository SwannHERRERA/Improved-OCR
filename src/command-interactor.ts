import { Helper } from './cli-helper';
import { CliFunctionnality } from './command-parser';
import { OUTPUT_DIR } from './config';
import { OcrExtractor } from './ocr-extractor';
import { parse } from './parser';
import { ClassifyInFile, GroupClasifyInFile, SingleClassifyInFile } from './write-code-result';
import { Writer } from './writer/writer';

export class CommandInteractor {
    private ocrExtractor: OcrExtractor;
    private argsConfigured: Map<CliFunctionnality, string>;
    private writer: Writer;
    private helper: Helper;

    constructor(
        ocrExtractor: OcrExtractor,
        argsConfigured: Map<CliFunctionnality, string>,
        writer: Writer,
        helper: Helper
    ) {
        this.ocrExtractor = ocrExtractor;
        this.argsConfigured = argsConfigured;
        this.writer = writer;
        this.helper = helper;
    }

    public async meshToOutput(argsParsed: Map<string, string[]>) {
        const isHelperCommand = argsParsed.has(
            this.argsConfigured.get(CliFunctionnality.HELPER) ?? ''
        );
        const inputFiles = argsParsed.get(
            this.argsConfigured.get(CliFunctionnality.INPUT_FILE) ?? ''
        );
        const outputFiles = argsParsed.get(
            this.argsConfigured.get(CliFunctionnality.OUTPUT_FILE) ?? ''
        );
        const isConsoleOutput = argsParsed.has(
            this.argsConfigured.get(CliFunctionnality.CONSOLE_OUTPUT) ?? ''
        );

        if (isHelperCommand) {
            this.helper.print();
        } else if (inputFiles) {
            const outputs: string[][] = await this.ocrExtractor.extract(
                await Promise.all(inputFiles.map(async (inputFile) => await parse(inputFile)))
            );

            if (isConsoleOutput) {
                const writer = this.writer;
                outputs.forEach((output) => writer.write(output));
            } else {
                let classifier: ClassifyInFile;
                if (outputFiles) {
                    classifier = new SingleClassifyInFile(outputs, outputFiles);
                } else {
                    classifier = new GroupClasifyInFile(outputs, OUTPUT_DIR);
                }
                classifier.write(inputFiles);
            }
        } else {
            this.helper.print();
        }
    }
}
