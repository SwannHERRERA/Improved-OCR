import { CliFunctionnality } from './cli';
import { Parser } from './parser';
import { Classify, ClassifyGroup, ClassifySingle } from './write-code-result';

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

    public process() {
        const inputFiles = this.argsParsed.get(
            this.argsConfigured.get(CliFunctionnality.INPUT_FILE) ?? ''
        );
        const outputFiles = this.argsParsed.get(
            this.argsConfigured.get(CliFunctionnality.OUTPUT_FILE) ?? ''
        );

        if (inputFiles) {
            let classifier: Classify;
            if (outputFiles) {
                classifier = new ClassifySingle(this.parser, outputFiles);
            } else {
                classifier = new ClassifyGroup(this.parser, '/Users/remy/Desktop/');
            }
            classifier.write(inputFiles);

            // si on match zéro scénaerio on affiche un helper dans la console
        }
    }
}
