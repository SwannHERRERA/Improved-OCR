import { expect, should } from 'chai';
import { spawn } from 'child_process';
import { unlink } from 'fs/promises';
import path from 'path';
import { parse } from '../parser';
import { WriterInConsole } from './writer-in-console';
import { WriterInFile } from './writer-in-file';

should();

describe('test to write', () => {
    describe('in a file', () => {
        it('write string in a file', async () => {
            const Writer = new WriterInFile('w', 'src/essai.txt');
            await Writer.write(['essai']);
            const str = await parse('src/essai.txt');
            str.should.be.equal('essai');
        });
        it('write string array in a file', async () => {
            const Writer = new WriterInFile('w', 'src/essai.txt');
            await Writer.write(['essai', 'pomme', 'jean']);
            const str = await parse('src/essai.txt');
            str.should.be.equal('essai\npomme\njean');
        });

        it('append string in a file', async () => {
            try {
                await unlink('src/essai_group.txt');
            } catch (error) {
                // files doesn't exist
            }
            const Writer = new WriterInFile('a', 'src/essai_group.txt');
            await Writer.write(['essai']);
            const str = await parse('src/essai_group.txt');
            str.should.be.equal('essai\n');
        });
        it('append string array in a file', async () => {
            try {
                await unlink('src/essai_group.txt');
            } catch (error) {
                // files doesn't exist
            }
            const Writer = new WriterInFile('a', 'src/essai_group.txt');
            await Writer.write(['essai', 'pomme', 'jean']);
            const str = await parse('src/essai_group.txt');
            str.should.be.equal('essai\npomme\njean\n');

            await Writer.write(['essai', 'pomme', 'jean']);
            const str2 = await parse('src/essai_group.txt');
            str2.should.be.equal('essai\npomme\njean\nessai\npomme\njean\n');
        });
    });

    describe('in the console', () => {
        it('write string in the console', async () => {
            const testAppFilePath = path.join(__dirname, '../writer.ts');
            const testApp = spawn('node', [testAppFilePath]);

            testApp.stdout.on('data', (data) => {
                const stdoutData = data;
                console.log(stdoutData);
                expect(stdoutData).equal('jean\npomme\n');
                expect(stdoutData).not.equal('jean pomme');
                testApp.kill('SIGINT');
            });
        });
    });
});
