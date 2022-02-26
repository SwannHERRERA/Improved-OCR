import { CliFunctionnality } from './cli';
import { parse, Parser } from './parser';
import { Classify, ClassifyGroup, ClassifySingle, codeToResultFormat } from './write-code-result';
import { WriterInConsole } from './writer/writer-in-console';

export class Command {
    private parser: Parser;
    private argsConfigured: Map<CliFunctionnality, string>;
    private argsParsed: Map<string, string[]>;

    constructor(
        parser: Parser,
        argsConfigured: Map<CliFunctionnality, string>,
        argsParsed: Map<string, string[]>
    ) {
        this.parser = parser;
        this.argsConfigured = argsConfigured;
        this.argsParsed = argsParsed;
    }

    public async process() {
        const inputFiles = this.argsParsed.get(
            this.argsConfigured.get(CliFunctionnality.INPUT_FILE) ?? ''
        );
        const outputFiles = this.argsParsed.get(
            this.argsConfigured.get(CliFunctionnality.OUTPUT_FILE) ?? ''
        );

        if (inputFiles) {
            if(this.argsConfigured.has(CliFunctionnality.CONSOLE_OUTPUT)) {
                const Writer = new WriterInConsole();
                for (const path of inputFiles) {
                    const content = await parse(path);
                    const codes = this.parser.extractCodes(content);
                    const output = codes.map((code) => codeToResultFormat(code));
                    await Writer.write(output);
                }
            }else {
                let classifier: Classify;
                if (outputFiles) {
                    classifier = new ClassifySingle(this.parser, outputFiles);
                } else {
                    classifier = new ClassifyGroup(this.parser, '/Users/remy/Desktop/');
                }
                classifier.write(inputFiles);
            }

            // si on match zéro scénaerio on affiche un helper dans la console
        }
    }
}
