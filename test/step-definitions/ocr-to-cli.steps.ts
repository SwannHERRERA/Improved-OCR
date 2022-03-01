import { should } from 'chai';
import { binding, given, then, when } from 'cucumber-tsflow';
import { CliHelper } from '../../src/cli-helper';
import { CommandInteractor } from '../../src/command-interactor';
import { CommandParser } from '../../src/command-parser';
import {
    argsConfigured,
    argsWithoutValues,
    DIGIT_HEIGHT,
    DIGIT_WIDTH,
    LINE_NUMBER_DIGIT,
} from '../../src/config';
import { OcrExtractor } from '../../src/ocr-extractor';
import { Parser } from '../../src/parser';
import { Writer } from '../../src/writer/writer';
import { WriterInConsole } from '../../src/writer/writer-in-console';
import { WriterStub } from '../writer/writer-stub.test';

should();

@binding()
export class OcrToCli {
    private command!: string;
    private commandParser!: CommandParser;
    private commandInteractor!: CommandInteractor;
    private argument!: Map<string, string[]>;
    private writer: Writer = new WriterStub();

    private expectedArgs = new Map([
        [
            '-f',
            [
                'test/fixtures/all-digit.txt',
                'test/fixtures/complete-entries/two-complete-entries.txt',
            ],
        ],
        ['-c', []],
    ]);
    @given(/this command (.*)/)
    public givenTheFollowingCommand(command: string) {
        this.command = command;
    }

    @when('i parse the command')
    public whenIParseTheCommand() {
        this.commandParser = new CommandParser(
            new Map(),
            argsConfigured,
            argsWithoutValues,
            new CliHelper(new WriterInConsole())
        );
        this.commandParser.parse(this.command);
    }

    @when('i create command interactor')
    public whenICreateCommandInteractor() {
        const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT, LINE_NUMBER_DIGIT);
        this.commandInteractor = new CommandInteractor(
            new OcrExtractor(parser),
            argsConfigured,
            new CliHelper(new WriterInConsole())
        );
    }

    @then('the argument should be as expected')
    public thenTheArgumentShouldBe() {
        this.argument = this.commandParser.getArgsParsed();
        this.argument.should.deep.equal(this.expectedArgs);
    }

    @then('the console output should be')
    public thenTheConsoleShouldBe(expected: unknown) {
        this.commandInteractor.meshToOutput(this.argument);
        const output = (this.writer as WriterStub).called;
        console.log('output' + output);
    }
}
