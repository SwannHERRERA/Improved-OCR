import { printHelper } from './cli-helper';
import { CliFunctionnality } from './command-parser';
import { OUTPUT_DIR } from './config';
import { parse, Parser } from './parser';
import { Classify, ClassifyGroup, ClassifySingle, codeToResultFormat } from './write-code-result';
import { Writer } from './writer/writer';

export class CommandInteractor {
    private parser: Parser;
    private argsConfigured: Map<CliFunctionnality, string>;
    private writer: Writer;

    constructor(parser: Parser, argsConfigured: Map<CliFunctionnality, string>, writer: Writer) {
        this.parser = parser;
        this.argsConfigured = argsConfigured;
        this.writer = writer;
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
            printHelper(this.writer);
        } else if (inputFiles) {
            const outputs: string[][] = await this.extractCodeFromFile(inputFiles);

            if (isConsoleOutput) {
                const writer = this.writer;
                outputs.forEach((output) => writer.write(output));
            } else {
                let classifier: Classify;
                if (outputFiles) {
                    classifier = new ClassifySingle(outputs, outputFiles);
                } else {
                    classifier = new ClassifyGroup(outputs, OUTPUT_DIR);
                }
                classifier.write(inputFiles);
            }

            // si on match zéro scénaerio on affiche un helper dans la console
        }
    }

    private async extractCodeFromFile(inputFiles: string[]) {
        const outputs: string[][] = [];
        for (const path of inputFiles) {
            const content = await parse(path);
            const codes = this.parser.extractCodes(content);
            outputs.push(codes.map((code) => codeToResultFormat(code)));
        }
        return outputs;
    }
}
