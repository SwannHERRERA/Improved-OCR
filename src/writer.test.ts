import { should } from 'chai';
import { parse } from './parser';
import { writeInFile } from './writer';

should();

describe('test to write in a file', () => {
    it('write string in a file', async () => {
        await writeInFile('src/essai.txt', ['essai']);
        const str = await parse('src/essai.txt');
        str.should.be.equal('essai');
    });
    it('write string array in a file', async () => {
        await writeInFile('src/essai.txt', ['essai', 'pomme', 'jean']);
        const str = await parse('src/essai.txt');
        str.should.be.equal('essai\npomme\njean');
    });
});
