import { expect, should } from 'chai';
import { spawn } from 'child_process';
import { unlink } from 'fs/promises';
import path from 'path';
import { readFile } from '../../src/parsing/parse-file';
import { WriterInFile } from '../../src/writer/writer-in-file';

should();

const fixtureOutputPath = 'test/fixtures/output/';

describe('test to write', () => {
    describe('in a file', () => {
        it('write string in a file', async () => {
            const Writer = new WriterInFile('w', fixtureOutputPath + 'essai.txt');
            await Writer.write(['essai']);
            const str = await readFile(fixtureOutputPath + 'essai.txt');
            str.should.be.equal('essai');
        });
        it('write string array in a file', async () => {
            const Writer = new WriterInFile('w', fixtureOutputPath + 'essai.txt');
            await Writer.write(['essai', 'pomme', 'jean']);
            const str = await readFile(fixtureOutputPath + 'essai.txt');
            str.should.be.equal('essai\npomme\njean');
        });

        it('append string in a file', async () => {
            try {
                await unlink(fixtureOutputPath + 'essai_group.txt');
            } catch (error) {
                // files doesn't exist
            }
            const Writer = new WriterInFile('a', fixtureOutputPath + 'essai_group.txt');
            await Writer.write(['essai']);
            const str = await readFile(fixtureOutputPath + 'essai_group.txt');
            str.should.be.equal('essai\n');
        });
        it('append string array in a file', async () => {
            try {
                await unlink(fixtureOutputPath + 'essai_group.txt');
            } catch (error) {
                // files doesn't exist
            }
            const Writer = new WriterInFile('a', fixtureOutputPath + 'essai_group.txt');
            await Writer.write(['essai', 'pomme', 'jean']);
            const str = await readFile(fixtureOutputPath + 'essai_group.txt');
            str.should.be.equal('essai\npomme\njean\n');

            await Writer.write(['essai', 'pomme', 'jean']);
            const str2 = await readFile(fixtureOutputPath + 'essai_group.txt');
            str2.should.be.equal('essai\npomme\njean\nessai\npomme\njean\n');
        });
    });

    describe('in the console', () => {
        it('write string in the console', (done) => {
            const testAppFilePath = path.join(__dirname + '/test-utils/write-in-console.ts');
            const testApp = spawn('ts-node', [testAppFilePath]);

            testApp.stdout.on('data', (data: Buffer) => {
                const stdoutData = data;
                expect(stdoutData.toString()).equal('jean\npomme\n');
                expect(stdoutData).not.equal('jean pomme');
                testApp.kill('SIGINT');
                done();
            });
        }).timeout(5000);
    });
});
