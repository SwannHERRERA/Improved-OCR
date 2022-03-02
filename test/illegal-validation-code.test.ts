import { should } from 'chai';
import { describe, it } from 'mocha';
import { illegalValidator } from '../src/classify-file';

should();


describe('test to illegal validation code', () => {
    it('for the code "123456789" the number have no ?', () => {
        illegalValidator("123456789").should.be.true;
    });

    it('for the value "356609701" the number have no ?', () => {
        illegalValidator("356609701").should.be.true;
    });

    it('for the value "3566?970" the number have one ?', () => {
        illegalValidator("3566?970").should.be.false;
    });

    it('for the value "?5668970?" the number have one ?', () => {
        illegalValidator("?5660970?").should.be.false;
    });
});
