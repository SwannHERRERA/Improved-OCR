import { Cli } from './cli';
import { Command } from './command';
import { argsConfigured, DIGIT_HEIGHT, DIGIT_WIDTH } from './config';
import { Parser } from './parser';

const command =
    '-f "src/fixtures/all-digit.txt" -c -f "src/fixtures/complete-entries/two-complete-entries.txt"';

const main = async () => {
    const cli = new Cli(new Map(), argsConfigured);
    const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT);
    cli.parse(command);
    const map = cli.getArgsParsed();
    const commandClass = new Command(parser, argsConfigured, map);
    commandClass.process();
};

main();
