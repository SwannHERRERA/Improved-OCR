import { CliFunctionnality } from './command-parser';
import { OUTPUT_DIR } from './config';
import { parse, Parser } from './parser';
import { Classify, ClassifyGroup, ClassifySingle, codeToResultFormat } from './write-code-result';
import { WriterInConsole } from './writer/writer-in-console';

export class CommandInteractor {
    private parser: Parser;
    private argsConfigured: Map<CliFunctionnality, string>;

    constructor(parser: Parser, argsConfigured: Map<CliFunctionnality, string>) {
        this.parser = parser;
        this.argsConfigured = argsConfigured;
    }

    public async meshToOutput(argsParsed: Map<string, string[]>) {
        const inputFiles = argsParsed.get(
            this.argsConfigured.get(CliFunctionnality.INPUT_FILE) ?? ''
        );
        const outputFiles = argsParsed.get(
            this.argsConfigured.get(CliFunctionnality.OUTPUT_FILE) ?? ''
        );
        const isConsoleOutput = argsParsed.has(
            this.argsConfigured.get(CliFunctionnality.CONSOLE_OUTPUT) ?? ''
        );

        if (inputFiles) {
            const outputs: string[][] = await this.extractCodeFromFile(inputFiles);

            if (isConsoleOutput) {
                const writer = new WriterInConsole();
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

        for (let i = 0; i < inputFiles.length; i++) {
            const path = inputFiles[i];
            const content = await parse(path);
            const codes = this.parser.extractCodes(content);
            outputs.push(codes.map((code) => codeToResultFormat(code)));
        }
        return outputs;
    }
}
