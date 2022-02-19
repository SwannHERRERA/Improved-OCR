import { computeChecksumValue, validCheckSum } from './checksum';
import { codeToResultFormat } from './write-code-result';

describe('test code to result format in result file', () => {
    describe('change code to result format', () => {
        it('from 123456789 code to 123456789 format because valid the checksum', () => {
            const code = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            validCheckSum(computeChecksumValue(code)).should.be.true;
            codeToResultFormat(code).should.equal('123456789');
        });

        it("from 33746589 code to 337465890 format because don't validate the checksum", () => {
            const code = [3, 3, 7, 4, 6, 5, 8, 9, 0];

            validCheckSum(computeChecksumValue(code)).should.be.false;
            codeToResultFormat(code).should.equal('337465890 ERR');
        });
    });
});
