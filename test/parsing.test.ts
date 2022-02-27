import { AssertionError, expect, should } from 'chai';
import { describe, it } from 'mocha';
import { DIGIT_HEIGHT, DIGIT_WIDTH } from '../src/config';
import { OcrReferenceToNumber } from '../src/number-to-ocr-reference';
import { extractDigit, extractEntry, parse, parseCodesFromFile } from '../src/parser';

should();

describe('sanity check for reading file', () => {
    it('file does not exist', async () => {
        try {
            await parse('file-doesnt-exist.txt');
            expect.fail('file does not exist');
        } catch (error) {
            // do nothing
        }
    });
    it('file exist', async () => {
        try {
            await parse('src/fixtures/simple-digits/one.txt');
        } catch (error) {
            expect.fail('file does not exist');
        }
    });
});

describe('test parsing individual number from files', () => {
    // const parser = new Parser(DIGIT_WIDTH, DIGIT_HEIGHT);
    const baseDigitPath = 'src/fixtures/simple-digits';
    describe('individual number in file', () => {
        it('file one should be equal to 1', async () => {
            const fileContent = (await parse(`${baseDigitPath}/one.txt`)).split('\n');
            const str = extractDigit(fileContent, 0);
            const one = OcrReferenceToNumber.get(str);
            if (typeof one === 'undefined') {
                throw new AssertionError('one in undefined');
            }
            one.should.be.equal(1);
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
                const fileContent = (await parse(filename)).split('\n');
                const str = extractDigit(fileContent, 0);
                const number = OcrReferenceToNumber.get(str);
                if (typeof number === 'undefined') {
                    throw new AssertionError('number in undefined');
                }
                number.should.be.equal(index + 1);
            });
        });
    });
    describe('Multiple numbers in one file and one entry', () => {
        it('parse one and two in the same file', async () => {
            const fileContent = (await parse('src/fixtures/one-two.txt')).split('\n');
            const strOne = extractDigit(fileContent, 0);
            const one = OcrReferenceToNumber.get(strOne);
            if (typeof one === 'undefined') {
                throw new AssertionError('one in undefined');
            }
            one.should.be.equal(1);
            const strTwo = extractDigit(fileContent, DIGIT_WIDTH);
            const two = OcrReferenceToNumber.get(strTwo);
            if (typeof two === 'undefined') {
                throw new AssertionError('two in undefined');
            }
            two.should.be.equal(2);
        });
        it('parse one compelte entry', async () => {
            const fileContent = (await parse('src/fixtures/all-digit.txt')).split('\n');
            for (let i = 1; i < 9; i += 1) {
                const str = extractDigit(fileContent, DIGIT_WIDTH * (i - 1));
                const number = OcrReferenceToNumber.get(str);
                if (typeof number === 'undefined') {
                    throw new AssertionError('one in undefined');
                }
                number.should.be.equal(i);
            }
        });

        it('parse one compelte entry with some unreadable number ', async () => {
            const resultCompleteEntries = ['12345?78?'];

            const res = await parseCodesFromFile('src/fixtures/entry-with-unreadable.txt');
            res.should.deep.equal(resultCompleteEntries);
        });
    });

    describe('parsing complete multiple entries', () => {
        it('parse 2 complete entries and get entry by entry', async () => {
            const entryOne = [
                `    _  _     _  _  _  _  _ `,
                `  | _| _||_||_ |_   ||_||_|`,
                `  ||_  _|  | _||_|  ||_| _|`,
                `                           `,
            ];

            const entryTwo = [
                ` _  _  _  _     _  _  _  _ `,
                ` _||_ |_ |_   ||_|  || | _|`,
                ` _| _||_||_|  | _|  ||_||_ `,
                `                           `,
            ];

            const fileContent = (
                await parse('src/fixtures/complete-entries/two-complete-entries.txt')
            ).split('\n');
            const numberEntries = fileContent.length / DIGIT_HEIGHT;
            const entries: string[][] = [];
            for (let e = 0; e < numberEntries; e++) {
                entries.push(extractEntry(fileContent, e));
            }
            entries[0].should.deep.equal(entryOne);
            entries[1].should.deep.equal(entryTwo);
        });
        it('parse 2 complete entries in one file', async () => {
            const resultCompleteEntries = ['123456789', '356619702'];

            const res = await parseCodesFromFile(
                'src/fixtures/complete-entries/two-complete-entries.txt'
            );
            res.should.deep.equal(resultCompleteEntries);
        });
    });
});
