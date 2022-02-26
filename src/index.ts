import { Cli, CliFunctionnality } from './cli';
import { argsConfigured, DIGIT_HEIGHT, DIGIT_WIDTH } from './config';
import { Parser } from './parser';
import { Classify, ClassifyGroup, ClassifySingle } from './write-code-result';

const paths = [
    'src/fixtures/all-digit.txt',
    'src/fixtures/complete-entries/two-complete-entries.txt',
];

const command = '-f "src/fixtures/all-digit.txt" -f "src/fixtures/complete-entries/two-complete-entries.txt"';

const main = async () => {
    const cli = new Cli(new Map(), argsConfigured);
    cli.parse(command);
    const map = cli.getArgsParsed();
    if (map.has(argsConfigured.get(CliFunctionnality.INPUT_FILE)!)) {
        //vérification ouput file
        let classifier: Classify;
        if (map.has(argsConfigured.get(CliFunctionnality.OUTPUT_FILE)!)) {
            classifier = new ClassifySingle(new Parser(DIGIT_WIDTH, DIGIT_HEIGHT));
        }else {
            classifier = new ClassifyGroup(new Parser(DIGIT_WIDTH, DIGIT_HEIGHT), '');
        }
        console.log(map.get(argsConfigured.get(CliFunctionnality.INPUT_FILE)!)!)
        classifier.write(map.get(argsConfigured.get(CliFunctionnality.INPUT_FILE)!)!);
        // si c'est pas le cas ça veut dire qu'on est en classify multiple files
        // si on a un ouput file
        // alors on est en simple classification

        // si on match zéro scénaerio on affiche un helper dans la console
    }

    // let str = '';
    // for (const path of paths) {
    //     str += await parse(path);
    //     if (path !== paths[paths.length - 1]) str += '\n';
    // }

    // const parser = new Parser(3, 4);
    // console.log(parser.extractCodes(str));
};

main();
