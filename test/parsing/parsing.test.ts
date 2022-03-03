import { expect, should } from 'chai';
import { describe, it } from 'mocha';
import { DIGIT_HEIGHT, DIGIT_WIDTH, LINE_NUMBER_DIGIT } from '../../src/config/config';
import { Parser } from '../../src/parsing/parser';
import {readFile} from '../../src/parsing/parse-file';

should();

describe('sanity check for reading file', () => {
    it('file does not exist', async () => {
        try {
            await readFile('file-doesnt-exist.txt');
            expect.fail('file does not exist');
        } catch (error) {
            // do nothing
        }
    });
    it('file exist', async () => {
        try {
            await readFile('test/fixtures/simple-digits/one.txt');
        } catch (error) {
            expect.fail('file does not exist');
        }
    });
});

describe('test parsing individual number from files', () => {
    // const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT);
    const baseDigitPath = 'test/fixtures/simple-digits';
    describe('individual number in file', () => {
        const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT, 1);
        it('file one should be equal to 1', async () => {
            const fileContent = await readFile(`${baseDigitPath}/one.txt`);
            const str = parser.extractCodes(fileContent);
            str[0].should.be.equal('1');
        });

        it('group', async () => {
            const filenames = [
                `${baseDigitPath}/zero.txt`,
                `${baseDigitPath}/one.txt`,
                `${baseDigitPath}/two.txt`,
                `${baseDigitPath}/three.txt`,
                `${baseDigitPath}/four.txt`,
                `${baseDigitPath}/five.txt`,
                `${baseDigitPath}/six.txt`,
                `${baseDigitPath}/seven.txt`,
                `${baseDigitPath}/height.txt`,
                `${baseDigitPath}/nine.txt`,
            ];
            filenames.forEach(async (filename, index) => {
                const fileContent = await readFile(filename);
                const str = parser.extractCodes(fileContent);
                str[index + 1].should.be.equal((index + 1).toString());
            });
        });
    });
    describe('Multiple numbers in one file and one entry', () => {
        it('parse one and two in the same file', async () => {
            const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT, 2);
            const fileContent = await readFile('test/fixtures/one-two.txt');
            const str = parser.extractCodes(fileContent);

            str[0].should.be.equal('12');
        });
        it('parse one compelte entry', async () => {
            const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT, LINE_NUMBER_DIGIT);
            const fileContent = await readFile('test/fixtures/all-digit.txt');
            const str = parser.extractCodes(fileContent);

            str[0].should.be.equal('123456789');
        });

        it('parse one compelte entry with some unreadable number ', async () => {
            const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT, LINE_NUMBER_DIGIT);
            const fileContent = await readFile('test/fixtures/entry-with-unreadable.txt');
            const str = parser.extractCodes(fileContent);
            str[0].should.be.equal('12345?78?');
        });
    });

    describe('parsing complete multiple entries', () => {
        it('parse 2 complete entries in one file', async () => {
            const resultCompleteEntries = ['123456789', '356619702'];
            const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT, LINE_NUMBER_DIGIT);

            const fileContent = await readFile(
                'test/fixtures/complete-entries/two-complete-entries.txt'
            );
            const str = parser.extractCodes(fileContent);

            str.should.deep.equal(resultCompleteEntries);
        });

        it('parse 100 entries in one file', async () => {
            const resultCompleteEntries: string[] = [];
            for (let i = 0; i < 20; i++) {
                resultCompleteEntries.push('123456789');
                resultCompleteEntries.push('163358789');
                resultCompleteEntries.push('733358280');
                resultCompleteEntries.push('734958260');
                resultCompleteEntries.push('714128260');
            }
            const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT, LINE_NUMBER_DIGIT);

            const fileContent = await readFile(
                'test/fixtures/complete-entries/one-hundred-entries.txt'
            );
            const str = parser.extractCodes(fileContent);

            str.should.deep.equal(resultCompleteEntries);
            str.length.should.equal(100);
        });
    });
});
