#!/usr/bin/env npx ts-node
 
import { argv } from 'process';
import { CommandParser } from './command-parser';
import { CommandInteractor } from './command-interactor';
import { argsConfigured, argsWithoutValues, DIGIT_HEIGHT, DIGIT_WIDTH, FILE_INDEX_IN_COMMAND, LINE_NUMBER_DIGIT } from './config';
import { Parser } from './parser';

function argvToCommand(argv: string[]): string {
    return argv.splice(FILE_INDEX_IN_COMMAND).join(' ');
}
function main(): void {
    const command = argvToCommand(argv);
    const commandParser = new CommandParser(new Map(), argsConfigured, argsWithoutValues);
    commandParser.parse(command);
    const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT, LINE_NUMBER_DIGIT);
    const argument = commandParser.getArgsParsed();
    const commandInteractor = new CommandInteractor(parser, argsConfigured);
    commandInteractor.meshToOutput(argument);
}

main();
