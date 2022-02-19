import { expect, should } from 'chai';
import { describe, it } from 'mocha';
import { parse } from './parser';

should();

describe('test parsing individual number from files', () => {
    it('file does not exist', async () => {
        try {
            await parse('file-doesnt-exist.txt');
            expect.fail('file does not exist');
        } catch (error) {}
    });
    // it('file one should be equal to 1', async () => {

    // });
});
