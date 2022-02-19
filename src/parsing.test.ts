import { AssertionError, expect, should } from 'chai';
import { assert } from 'console';
import { describe, it } from 'mocha';
import { digitHeight, digitWidth } from './config';
import { numberToOcrReference } from './number-to-ocr-reference';
import { extractDigit, parse } from './parser';

should();

describe('sanity check for reading file', () => {
    it('file does not exist', async () => {
        try {
            await parse('file-doesnt-exist.txt');
            expect.fail('file does not exist');
        } catch (error) {
            console.log(error);
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
    const baseDigitPath = 'src/fixtures/simple-digits';
    describe('individual number in file', () => {
        it('file one should be equal to 1', async () => {
            const fileContent = (await parse(`${baseDigitPath}/one.txt`)).split('\n');
            const str = extractDigit(fileContent, 0);
            const one = numberToOcrReference.get(str);
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
                const number = numberToOcrReference.get(str);
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
            const one = numberToOcrReference.get(strOne);
            if (typeof one === 'undefined') {
                throw new AssertionError('one in undefined');
            }
            one.should.be.equal(1);
            const strTwo = extractDigit(fileContent, digitWidth);
            const two = numberToOcrReference.get(strTwo);
            if (typeof two === 'undefined') {
                throw new AssertionError('two in undefined');
            }
            two.should.be.equal(2);
        });
        it('parse one compelte entry', async () => {
            const fileContent = (await parse('src/fixtures/all-digit.txt')).split('\n');
            for (let i = 1; i < 9; i += 1) {
                const str = extractDigit(fileContent, digitWidth * (i - 1));
                const number = numberToOcrReference.get(str);
                if (typeof number === 'undefined') {
                    throw new AssertionError('one in undefined');
                }
                number.should.be.equal(i);
            }
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
            const numberEntries = fileContent.length / digitHeight;
            const entries: string[][] = [];
            for (let e = 0; e < numberEntries; e++) {
                const start = digitHeight * e;
                entries.push(fileContent.slice(start, start + digitHeight));
            }
            entries[0].should.deep.equal(entryOne);
            entries[1].should.deep.equal(entryTwo);
        });
        it('parse 2 complete entries in one file', async () => {
            const fileContent = (
                await parse('src/fixtures/complete-entries/two-complete-entries.txt')
            ).split('\n');
            const resultCompleteEntries = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [3, 5, 6, 6, 1, 9, 7, 0, 2],
            ];
            const numberEntries = fileContent.length / digitHeight;
            for (let e = 0; e < numberEntries; e++) {
                const start = digitHeight * e;
                const str = fileContent.slice(start, start + digitHeight);
                for (let i = 0; i < 8; i += 1) {
                    const res = extractDigit(str, digitWidth * i);
                    const number = numberToOcrReference.get(res);
                    if (typeof number === 'undefined') {
                        throw new AssertionError(`${res} has no results`);
                    }
                    number.should.be.equal(resultCompleteEntries[e][i]);
                }
            }
        });
    });
});
