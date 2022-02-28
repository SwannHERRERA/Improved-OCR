#!/usr/bin/env npx ts-node

import { argv } from 'process';
import { CommandParser } from './command-parser';
import { CommandInteractor } from './command-interactor';
import {
    argsConfigured,
    argsWithoutValues,
    DIGIT_HEIGHT,
    DIGIT_WIDTH,
    FILE_INDEX_IN_COMMAND,
} from './config';
import { Parser } from './parser';
import { WriterInConsole } from './writer/writer-in-console';

function argvToCommand(params: string[]): string {
    return params.splice(FILE_INDEX_IN_COMMAND).join(' ');
}

function main(): void {
    const command = argvToCommand(argv);
    const commandParser = new CommandParser(new Map(), argsConfigured, argsWithoutValues);
    commandParser.parse(command);
    const argument = commandParser.getArgsParsed();
    const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT);
    const commandInteractor = new CommandInteractor(parser, argsConfigured, new WriterInConsole());
    commandInteractor.meshToOutput(argument);
}

main();
