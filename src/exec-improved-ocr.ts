#!/usr/bin/env npx ts-node
 
import { argv } from 'process';
import { Cli } from './cli';
import { Command } from './command';
import { argsConfigured, DIGIT_HEIGHT, DIGIT_WIDTH } from './config';
import { Parser } from './parser';


function main(): void {


    const input = argv.splice(2).join(' ')
    const cli = new Cli(new Map(), argsConfigured);
    const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT);
    cli.parse(input);

    const map = cli.getArgsParsed();

    const commandClass = new Command(parser, argsConfigured, map);
    commandClass.process();
}

main();
