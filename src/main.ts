#!/usr/bin/env npx ts-node

import { argv } from 'process';
import { CommandParser } from './parsing/command-parser';
import { CommandInteractor } from './parsing/command-interactor';

import {
    argsConfigured,
    argsWithoutValues,
    DIGIT_HEIGHT,
    DIGIT_WIDTH,
    FILE_INDEX_IN_COMMAND,
    LINE_NUMBER_DIGIT,
    validators,
} from './config/config';
import { Parser } from './parsing/parser';
import { WriterInConsole } from './writer/writer-in-console';
import { CliHelper } from './helpers/cli-helper';
import { Writer } from './writer/writer';
import { OcrExtractor } from './parsing/ocr-extractor';
import { SimpleClassifyConsole } from './classifier/classify-console';
import { CodeToResult } from './validation/code-to-result';

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
        new OcrExtractor(parser, new CodeToResult(validators)),
        argsConfigured,
        new CliHelper(writer),
        new SimpleClassifyConsole()
    );
    commandInteractor.meshToOutput(argument);
}

main();
