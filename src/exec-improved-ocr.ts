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
    LINE_NUMBER_DIGIT,
} from './config';
import { Parser } from './parser';
import { WriterInConsole } from './writer/writer-in-console';
import { CliHelper } from './cli-helper';
import { Writer } from './writer/writer';
import { OcrExtractor } from './ocr-extractor';
import { SimpleClassifyConsole } from './classify-console';

function argvToCommand(params: string[]): string {
    return params.splice(FILE_INDEX_IN_COMMAND).join(' ');
}

function main(): void {
    const command = argvToCommand(argv);
    const writer: Writer = new WriterInConsole();
    const commandParser = new CommandParser(
        new Map(),
        argsConfigured,
        argsWithoutValues,
        new CliHelper(writer)
    );
    commandParser.parse(command);
    const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT, LINE_NUMBER_DIGIT);
    const argument = commandParser.getArgsParsed();
    const commandInteractor = new CommandInteractor(
        new OcrExtractor(parser),
        argsConfigured,
        new CliHelper(writer),
        new SimpleClassifyConsole()
    );
    commandInteractor.meshToOutput(argument);
}

main();
