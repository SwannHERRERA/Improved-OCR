import { unlink } from 'fs/promises';
import { computeChecksumValue, validCheckSum } from '../src/checksum';
import { parse } from '../src/parsing/parser';
import { GroupClasifyFile, SingleClassifyFile } from '../src/classifier/classify-file';
import { CodeToResult } from '../src/validation/code-to-result';
import { errorValidator, illegalValidator } from '../src/validation/validators';

describe('test code to result format in result file', () => {
    const codeToResult = new CodeToResult(
        new Map([
            [' ILL', illegalValidator],
            [' ERR', errorValidator],
        ])
    );
    describe('change code to result format', () => {
        it('from 123456789 code to 123456789 format because valid the checksum', () => {
            const code = '123456789';

            validCheckSum(computeChecksumValue(code)).should.be.true;
            codeToResult.format(code).should.equal('123456789');
        });

        it("from 337465890 code to 337465890 format because don't validate the checksum", () => {
            const code = '337465890';

            validCheckSum(computeChecksumValue(code)).should.be.false;
            codeToResult.format(code).should.equal('337465890 ERR');
        });

        it("from 33-1465-192 code to 33?465?92 format because don't validate the checksum", () => {
            const code = '33?465?92';

            codeToResult.format(code).should.equal('33?465?92 ILL');
        });
    });
    describe('ClassifySingle', async () => {
        it('classify file', async () => {
            const paths = [
                'test/fixtures/complete-entries/two-complete-entries.txt',
                'test/fixtures/complete-entries/checksum-error.txt',
                'test/fixtures/entry-with-unreadable.txt',
            ];
            const outputPaths = [
                'test/fixtures/complete-entries/two-complete-entries.txt.result',
                'test/fixtures/complete-entries/checksum-error.txt.result',
                'test/fixtures/entry-with-unreadable.txt.result',
            ];
            const classifier = new SingleClassifyFile(
                [['123456789', '356619702'], ['123456789', '356619782 ERR'], ['12345?78? ILL']],
                outputPaths
            );
            await classifier.write(paths);
            const twoCompleteEntryResult = await parse(
                'test/fixtures/complete-entries/two-complete-entries.txt.result'
            );
            twoCompleteEntryResult.should.be.equal('123456789\n356619702');

            const checksumErrorResult = await parse(
                'test/fixtures/complete-entries/checksum-error.txt.result'
            );
            checksumErrorResult.should.be.equal('123456789\n356619782 ERR');

            const entryWithUnreadableResult = await parse(
                'test/fixtures/entry-with-unreadable.txt.result'
            );
            entryWithUnreadableResult.should.be.equal('12345?78? ILL');
        });
    });

    describe('ClassifyGrouped', async () => {
        it('classify file', async () => {
            const paths = [
                'test/fixtures/complete-entries/two-complete-entries.txt',
                'test/fixtures/complete-entries/checksum-error.txt',
                'test/fixtures/entry-with-unreadable.txt',
            ];
            try {
                await unlink('test/fixtures/result-Authorized');
                await unlink('test/fixtures/result-Errored');
                await unlink('test/fixtures/result-Unknown');
            } catch (error) {
                // files doesn't exist
            }
            const classifier = new GroupClasifyFile(
                [['123456789', '356619702'], ['123456789', '12345?78? ILL'], ['356619782 ERR']],
                'test/fixtures/result-'
            );
            await classifier.write(paths);
            const resultAuthorized = await parse('test/fixtures/result-Authorized');
            resultAuthorized.should.be.equal('123456789\n356619702\n123456789\n');
            const resultUnknown = await parse('test/fixtures/result-Unknown');
            resultUnknown.should.be.equal('12345?78? ILL\n');
            const resultErrored = await parse('test/fixtures/result-Errored');
            resultErrored.should.be.equal('356619782 ERR\n');
            await unlink('test/fixtures/result-Authorized');
            await unlink('test/fixtures/result-Errored');
            await unlink('test/fixtures/result-Unknown');
        });
    });
});
