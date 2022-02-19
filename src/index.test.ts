import { AssertionError, should } from 'chai';
import { describe, it } from 'mocha';
import { numberToOcrReference } from './number-to-ocr-reference';

should();

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
    it('height should be equal to reference', () => {
        const height = numberToOcrReference.get(8);
        if (typeof height === 'undefined') {
            throw new AssertionError('height in undefined');
        }
        let str = '\n';
        str += ' _ \n';
        str += '|_|\n';
        str += '|_|\n';
        str += '   \n';
        height.should.be.equal(str);
    });
    it('sever should be equal to reference', () => {
        const seven = numberToOcrReference.get(7);
        if (typeof seven === 'undefined') {
            throw new AssertionError('seven in undefined');
        }
        let str = '\n';
        str += ' _ \n';
        str += '  |\n';
        str += '  |\n';
        str += '   \n';
        seven.should.be.equal(str);
    });
    it('six should be equal to reference', () => {
        const six = numberToOcrReference.get(6);
        if (typeof six === 'undefined') {
            throw new AssertionError('six in undefined');
        }
        let str = '\n';
        str += ' _ \n';
        str += '|_ \n';
        str += '|_|\n';
        str += '   \n';
        six.should.be.equal(str);
    });
    it('five should be equal to reference', () => {
        const five = numberToOcrReference.get(5);
        if (typeof five === 'undefined') {
            throw new AssertionError('five in undefined');
        }
        let str = '\n';
        str += ' _ \n';
        str += '|_ \n';
        str += ' _|\n';
        str += '   \n';
        five.should.be.equal(str);
    });
    it('four should be equal to reference', () => {
        const four = numberToOcrReference.get(4);
        if (typeof four === 'undefined') {
            throw new AssertionError('four in undefined');
        }
        let str = '\n';
        str += '   \n';
        str += '|_|\n';
        str += '  |\n';
        str += '   \n';
        four.should.be.equal(str);
    });
    it('three should be equal to reference', () => {
        const three = numberToOcrReference.get(3);
        if (typeof three === 'undefined') {
            throw new AssertionError('three in undefined');
        }
        let str = '\n';
        str += ' _ \n';
        str += ' _|\n';
        str += ' _|\n';
        str += '   \n';
        three.should.be.equal(str);
    });
    it('two should be equal to reference', () => {
        const two = numberToOcrReference.get(2);
        if (typeof two === 'undefined') {
            throw new AssertionError('two in undefined');
        }
        let str = '\n';
        str += ' _ \n';
        str += ' _|\n';
        str += '|_ \n';
        str += '   \n';
        two.should.be.equal(str);
    });
    it('one should be equal to reference', () => {
        const one = numberToOcrReference.get(1);
        if (typeof one === 'undefined') {
            throw new AssertionError('one in undefined');
        }
        let str = '\n';
        str += '   \n';
        str += '  |\n';
        str += '  |\n';
        str += '   \n';
        one.should.be.equal(str);
    });
});
