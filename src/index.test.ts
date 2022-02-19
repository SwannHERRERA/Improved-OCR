import { should } from 'chai';
import { describe, it } from 'mocha';

should();

describe('Test testing configuration', () => {
    it('Sanity check of testing', () => {
        Number(1).should.equal(1);
    });
});
