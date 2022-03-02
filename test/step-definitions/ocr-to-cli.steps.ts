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
import { parse, Parser } from '../../src/parser';
import { WriterInConsole } from '../../src/writer/writer-in-console';
import { MockClassifierConsole } from '../writer/classifier-console-mock.test';

import { WriterMock } from '../writer/writer-mock.test';
import { Writer } from '../../src/writer/writer';
import { CodeToResult } from '../../src/validation/code-to-result';
import { errorValidator, illegalValidator } from '../../src/validation/validators';

should();

@binding()
export class OcrToCli {
    private command!: string;
    private commandParser!: CommandParser;
    private commandInteractor!: CommandInteractor;
    private argument!: Map<string, string[]>;
    private classifierConsole: ClassifyConsole = new MockClassifierConsole();
    private writer: Writer = new WriterMock();
    private codeToResult: CodeToResult = new CodeToResult(
        new Map([
            [' ILL', illegalValidator],
            [' ERR', errorValidator],
        ])
    );

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
            new OcrExtractor(parser, this.codeToResult),
            argsConfigured,
            new CliHelper(new WriterInConsole()),
            this.classifierConsole
        );
    }

    @when('i exec the command')
    public whenIExecTheCommand() {
        this.commandParser = new CommandParser(
            new Map(),
            argsConfigured,
            argsWithoutValues,
            new CliHelper(this.writer)
        );
        this.commandParser.parse(this.command);
        this.argument = this.commandParser.getArgsParsed();
        const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT, LINE_NUMBER_DIGIT);
        this.commandInteractor = new CommandInteractor(
            new OcrExtractor(parser, this.codeToResult),
            argsConfigured,
            new CliHelper(this.writer),
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

    @then('the console output should be the helper')
    public async thenTheConsoleShouldBeTheHelper() {
        await this.commandInteractor.meshToOutput(this.argument);
        const helper = [
            'usage: ./src/exec-improved-ocr.ts -f FileInputPath ...',
            'translate ocr files to number representation in three files Authorized Errored Unknown (you can specify multiple input files)\n',
            'usage: ./src/exec-improved-ocr.ts -f FilePath -o fileouputPath ...',
            'translate ocr file to number representation in the ouput file corresponding (you can specify multiple conbinations)\n',
            'usage: ./src/exec-improved-ocr.ts -c -f FilePath ...',
            'translate ocr file to number representation in the console (you can specify multiple input files)\n',
            'optional arguments:',
            '   -h                show this help message and exit',
            '   -c CONSOLE        specify to ouput in console',
            '   -f INPUT_FILE     specify the input file path with OCR text',
            '   -o OUTPUT_FILE    specify the ouput file path create or not',
        ];
        const linesWrited = (this.writer as WriterMock).writed;
        linesWrited.should.be.deep.equal(helper);
    }

    @then(/the content file (.*) should be/)
    public async thenTheContentFiletShouldBe(pathFile: string, expected: DataTable) {
        await this.commandInteractor.meshToOutput(this.argument);
        pathFile = `${__dirname}/../../${pathFile.replace(/"/g, '')}`;

        const resultFile = await parse(pathFile);
        const linesExpected = expected.raw();
        linesExpected[0][0].should.be.equal(resultFile);
    }
}
