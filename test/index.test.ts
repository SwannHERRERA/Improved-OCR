import { AssertionError, should } from 'chai';
import { describe, it } from 'mocha';
import { OcrReferenceToNumber } from '../src/number-to-ocr-reference';

should();

describe('test string concatenate to number OCR reference', () => {
    it('nine should be equal to reference', () => {
        let str = '\n';
        str += ' _ \n';
        str += '|_|\n';
        str += ' _|\n';
        str += '   \n';
        const nine = OcrReferenceToNumber.get(str);
        if (typeof nine === 'undefined') {
            throw new AssertionError('nine in undefined');
        }
        nine.should.be.equal(9);
    });
    it('nine should be undefined', () => {
        let str = '\n';
        str += ' _ \n';
        str += '|_|\n';
        str += ' _c|\n';
        str += '   \n';
        const nine = OcrReferenceToNumber.get(str);
        (typeof nine === 'undefined').should.be.true;
    });
    it('height should be equal to reference', () => {
        let str = '\n';
        str += ' _ \n';
        str += '|_|\n';
        str += '|_|\n';
        str += '   \n';
        const height = OcrReferenceToNumber.get(str);
        if (typeof height === 'undefined') {
            throw new AssertionError('height in undefined');
        }
        height.should.be.equal(8);
    });
    it('sever should be equal to reference', () => {
        let str = '\n';
        str += ' _ \n';
        str += '  |\n';
        str += '  |\n';
        str += '   \n';
        const seven = OcrReferenceToNumber.get(str);
        if (typeof seven === 'undefined') {
            throw new AssertionError('seven in undefined');
        }
        seven.should.be.equal(7);
    });
    it('six should be equal to reference', () => {
        let str = '\n';
        str += ' _ \n';
        str += '|_ \n';
        str += '|_|\n';
        str += '   \n';
        const six = OcrReferenceToNumber.get(str);
        if (typeof six === 'undefined') {
            throw new AssertionError('six in undefined');
        }
        six.should.be.equal(6);
    });
    it('five should be equal to reference', () => {
        let str = '\n';
        str += ' _ \n';
        str += '|_ \n';
        str += ' _|\n';
        str += '   \n';
        const five = OcrReferenceToNumber.get(str);
        if (typeof five === 'undefined') {
            throw new AssertionError('five in undefined');
        }
        five.should.be.equal(5);
    });
    it('four should be equal to reference', () => {
        let str = '\n';
        str += '   \n';
        str += '|_|\n';
        str += '  |\n';
        str += '   \n';
        const four = OcrReferenceToNumber.get(str);
        if (typeof four === 'undefined') {
            throw new AssertionError('four in undefined');
        }
        four.should.be.equal(4);
    });
    it('three should be equal to reference', () => {
        let str = '\n';
        str += ' _ \n';
        str += ' _|\n';
        str += ' _|\n';
        str += '   \n';
        const three = OcrReferenceToNumber.get(str);
        if (typeof three === 'undefined') {
            throw new AssertionError('three in undefined');
        }
        three.should.be.equal(3);
    });
    it('two should be equal to reference', () => {
        let str = '\n';
        str += ' _ \n';
        str += ' _|\n';
        str += '|_ \n';
        str += '   \n';
        const two = OcrReferenceToNumber.get(str);
        if (typeof two === 'undefined') {
            throw new AssertionError('two in undefined');
        }
        two.should.be.equal(2);
    });
    it('one should be equal to reference', () => {
        let str = '\n';
        str += '   \n';
        str += '  |\n';
        str += '  |\n';
        str += '   \n';
        const one = OcrReferenceToNumber.get(str);
        if (typeof one === 'undefined') {
            throw new AssertionError('one in undefined');
        }
        one.should.be.equal(1);
    });
});
