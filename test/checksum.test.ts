import { should } from 'chai';
import { describe, it } from 'mocha';
import { computeChecksumValue, validCheckSum } from '../src/checksum';

should();

describe('test checksum validation', () => {
    describe('test to compute checkSumValue', () => {
        it('for the code 356609701 the compute should be equal to 167', () => {
            const code = '356609701';
            computeChecksumValue(code).should.be.equal(203);
        });

        it('for the code 000000000 the compute should be equal to 0', () => {
            const code = '000000000';
            computeChecksumValue(code).should.be.equal(0);
        });

        it('for the code 123456789 the compute should be equal to 0', () => {
            const code = '123456789';
            computeChecksumValue(code).should.be.equal(165);
        });
    });

    describe('test to validate Value', () => {
        it('for the value 203 the checksum validation is not valid', () => {
            validCheckSum(203).should.be.false;
        });

        it('for the value 165 the checksum validation is valid', () => {
            validCheckSum(165).should.be.true;
        });

        it('for the value 0 the checksum validation is valid', () => {
            validCheckSum(0).should.be.true;
        });
    });
});
