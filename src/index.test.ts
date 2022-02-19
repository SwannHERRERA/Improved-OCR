import { AssertionError, should } from 'chai';
import { describe, it } from 'mocha';
import { numberToOcrReference } from './number-to-ocr-reference';

should();

describe('Test testing configuration', () => {
    it('Sanity check of testing', () => {
        Number(1).should.equal(1);
    });
});

describe('test string concatenate to number OCR reference', () => {
    it('nine should be equal to reference', () => {
        const nine = numberToOcrReference.get(9);
        if (typeof nine === 'undefined') {
            throw new AssertionError('nine in undefined');
        }
        let str = '\n';
        str += ' _ \n';
        str += '|_|\n';
        str += ' _|\n';
        str += '   \n';
        nine.should.be.equal(str);
    });
});
