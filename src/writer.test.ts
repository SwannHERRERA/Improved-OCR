import { should } from 'chai';
import { unlink } from 'fs/promises';
import { parse } from './parser';
import { WriterInFile } from './writer';

should();

describe('test to write in a file', () => {
    
    it('write string in a file', async () => {
        const Writer = new WriterInFile("w",'src/essai.txt');
        await Writer.write(['essai']);
        const str = await parse('src/essai.txt');
        str.should.be.equal('essai');
    });
    it('write string array in a file', async () => {
        const Writer = new WriterInFile("w",'src/essai.txt' );
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
        const Writer = new WriterInFile("a",'src/essai_group.txt');
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
        const Writer = new WriterInFile("a",'src/essai_group.txt');
        await Writer.write(['essai', 'pomme', 'jean']);
        const str = await parse('src/essai_group.txt');
        str.should.be.equal('essai\npomme\njean\n');

        await Writer.write(['essai', 'pomme', 'jean']);
        const str2 = await parse('src/essai_group.txt');
        str2.should.be.equal('essai\npomme\njean\nessai\npomme\njean\n');
    });
});
