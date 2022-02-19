import { AssertionError, expect, should } from 'chai';
import { describe, it } from 'mocha';
import { numberToOcrReference } from './number-to-ocr-reference';
import { extractDigit, parse } from './parser';

should();

describe('test parsing individual number from files', () => {
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
            await parse('src/fixtures/one.txt');
        } catch (error) {
            expect.fail('file does not exist');
        }
    });
    it('file one should be equal to 1', async () => {
        const fileContent = (await parse('src/fixtures/one.txt')).split('\n');
        const str = extractDigit(fileContent, 0);
        const one = numberToOcrReference.get(str);
        if (typeof one === 'undefined') {
            throw new AssertionError('one in undefined');
        }
        one.should.be.equal(1);
    });
    it('group', async () => {
        const filenames = [
            'src/fixtures/one.txt',
            'src/fixtures/two.txt',
            'src/fixtures/three.txt',
            'src/fixtures/four.txt',
            'src/fixtures/five.txt',
            'src/fixtures/six.txt',
            'src/fixtures/seven.txt',
            'src/fixtures/height.txt',
            'src/fixtures/nine.txt',
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
