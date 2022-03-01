import { should } from 'chai';
import { DataTable } from '@cucumber/cucumber';
import { binding, given, then, when } from 'cucumber-tsflow';
import { ClassifyConsole } from '../../src/classify-console';
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
import { WriterInConsole } from '../../src/writer/writer-in-console';
import { MockClassifierConsole } from '../writer/classifier-console-mock.test';

should();

@binding()
export class OcrToCli {
    private command!: string;
    private commandParser!: CommandParser;
    private commandInteractor!: CommandInteractor;
    private argument!: Map<string, string[]>;
    private classifierConsole: ClassifyConsole = new MockClassifierConsole();

    private expectedArgs = new Map([
        [
            'command and files without errors',
            new Map([
                [
                    '-f',
                    [
                        'test/fixtures/all-digit.txt',
                        'test/fixtures/complete-entries/two-complete-entries.txt',
                    ],
                ],
                ['-c', []],
            ]),
        ],
        [
            'errored',
            new Map([
                ['-f', ['test/fixtures/complete-entries/checksum-error.txt']],
                ['-c', []],
            ]),
        ],
        [
            'illisible',
            new Map([
                ['-f', ['test/fixtures/entry-with-unreadable.txt']],
                ['-c', []],
            ]),
        ],
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
            new CliHelper(new WriterInConsole()),
            this.classifierConsole
        );
    }

    @then(/the argument should be (.*)/)
    public thenTheArgumentShouldBe(command: string) {
        this.argument = this.commandParser.getArgsParsed();
        this.argument.should.deep.equal(this.expectedArgs.get(command));
    }

    @then('the console output should be')
    public async thenTheConsoleShouldBe(expected: DataTable) {
        await this.commandInteractor.meshToOutput(this.argument);
        const linesPrint = (this.classifierConsole as MockClassifierConsole).called;
        const linesExpected = expected.raw();
        linesExpected.length.should.be.equal(linesPrint.length);
        for (let i = 0; i < linesPrint.length; i += 1) {
            linesExpected[i][0].should.be.equal(linesPrint[i]);
        }
    }
}
