import { unlink } from 'fs/promises';
import { computeChecksumValue, validCheckSum } from './checksum';
import { DIGIT_HEIGHT, DIGIT_WIDTH } from './config';
import { parse, Parser } from './parser';
import { ClassifyGroup, ClassifySingle, codeToResultFormat } from './write-code-result';

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
    describe('ClassifySingle', async () => {
        it('classify file', async () => {
            const paths = [
                'src/fixtures/complete-entries/two-complete-entries.txt',
                'src/fixtures/complete-entries/checksum-error.txt',
                'src/fixtures/entry-with-unreadable.txt',
            ];
            const classifier = new ClassifySingle(new Parser(DIGIT_WIDTH, DIGIT_HEIGHT));
            classifier.write(paths);
            const twoCompleteEntryResult = await parse(
                'src/fixtures/complete-entries/two-complete-entries.txt.result'
            );
            twoCompleteEntryResult.should.be.equal('123456789\n356619702');

            const checksumErrorResult = await parse(
                'src/fixtures/complete-entries/checksum-error.txt.result'
            );
            checksumErrorResult.should.be.equal('123456789\n356619782 ERR');

            const entryWithUnreadableResult = await parse(
                'src/fixtures/entry-with-unreadable.txt.result'
            );
            entryWithUnreadableResult.should.be.equal('12345?78? ILL');
        });
    });

    describe('ClassifyGrouped', async () => {
        it('classify file', async () => {
            const paths = [
                'src/fixtures/complete-entries/two-complete-entries.txt',
                'src/fixtures/complete-entries/checksum-error.txt',
                'src/fixtures/entry-with-unreadable.txt',
            ];
            try {
                await unlink('src/fixtures/result-Authorized');
                await unlink('src/fixtures/result-Errored');
                await unlink('src/fixtures/result-Unknown');
            } catch (error) {
                console.log(error);
            }
            const classifier = new ClassifyGroup(new Parser(DIGIT_WIDTH, DIGIT_HEIGHT));
            await classifier.write(paths);
            const resultAuthorized = await parse('src/fixtures/result-Authorized');
            resultAuthorized.should.be.equal('123456789\n356619702\n123456789\n');
            const resultUnknown = await parse('src/fixtures/result-Unknown');
            resultUnknown.should.be.equal('12345?78? ILL\n');
            const resultErrored = await parse('src/fixtures/result-Errored');
            resultErrored.should.be.equal('356619782 ERR\n');
            await unlink('src/fixtures/result-Authorized');
            await unlink('src/fixtures/result-Errored');
            await unlink('src/fixtures/result-Unknown');
        });
    });
});
