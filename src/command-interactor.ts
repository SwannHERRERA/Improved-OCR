import { CliFunctionnality } from './cli';
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
            // TODO
            // Faire ce traitement de manière groupé
            // const content = await parse(path);
            // const codes = this.parser.extractCodes(content);
            // const output = codes.map((code) => codeToResultFormat(code));

            if (isConsoleOutput) {
                const Writer = new WriterInConsole();
                for (const path of inputFiles) {
                    const content = await parse(path);
                    const codes = this.parser.extractCodes(content);
                    const output = codes.map((code) => codeToResultFormat(code));
                    await Writer.write(output);
                }
            } else {
                let classifier: Classify;
                if (outputFiles) {
                    classifier = new ClassifySingle(this.parser, outputFiles);
                } else {
                    classifier = new ClassifyGroup(this.parser, '');
                }
                classifier.write(inputFiles);
            }

            // si on match zéro scénaerio on affiche un helper dans la console
        }
    }
}
