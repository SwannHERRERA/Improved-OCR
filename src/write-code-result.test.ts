import { computeChecksumValue, validCheckSum } from './checksum';
import { codeToResultFormat } from './write-code-result';

describe('test code to result format in result file', () => {
    describe('change code to result format', () => {
        it('from 123456789 code to 123456789 format because valid the checksum', () => {
            const code = '123456789';

            validCheckSum(computeChecksumValue(code)).should.be.true;
            codeToResultFormat(code).should.equal('123456789');
        });

        it("from 337465890 code to 337465890 format because don't validate the checksum", () => {
            const code = '337465890';

            validCheckSum(computeChecksumValue(code)).should.be.false;
            codeToResultFormat(code).should.equal('337465890 ERR');
        });

        it("from 33-1465-192 code to 33?465?92 format because don't validate the checksum", () => {
            const code = '33?465?92';

            codeToResultFormat(code).should.equal('33?465?92 ILL');
        });
    });
});
