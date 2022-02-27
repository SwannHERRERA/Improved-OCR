import { argv } from 'process';
import { CommandParser } from './command-parser';
import { CommandInteractor } from './command-interactor';
import { argsConfigured, DIGIT_HEIGHT, DIGIT_WIDTH, FILE_INDEX_IN_COMMAND } from './config';
import { Parser } from './parser';

function argvToCommand(argv: string[]): string {
    return argv.splice(FILE_INDEX_IN_COMMAND).join(' ');
}
function main(): void {
    const command = argvToCommand(argv);
    const commandParser = new CommandParser(new Map(), argsConfigured);
    commandParser.parse(command);
    const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT);
    const argument = commandParser.getArgsParsed();
    const commandInteractor = new CommandInteractor(parser, argsConfigured);
    commandInteractor.meshToOutput(argument);
}

main();
