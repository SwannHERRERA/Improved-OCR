import { expect, should } from 'chai';
import { describe, it } from 'mocha';
import { Cli } from '../src/cli';
import { argsConfigured } from '../src/config';

should();

describe('test cli parse', () => {
    let cli = new Cli(new Map(), argsConfigured);
    beforeEach(() => {
        cli = new Cli(new Map(), argsConfigured);
    });

    it('test -f is parse as the filename', () => {
        cli.parse('-f "pomme.txt"');

        cli.getArgsParsed().should.deep.equal(new Map([['-f', ['pomme.txt']]]));
    });

    it('test -f is parse as the filename with a filename that contain space', () => {
        cli.parse('-f "pomme jean.txt"');

        cli.getArgsParsed().should.deep.equal(new Map([['-f', ['pomme$%&jean.txt']]]));
    });

    it('test -f is parse as the filename with a filename that contain spaces', () => {
        cli.parse('-f "jean pomme.txt" -f "to lo pomme.txt"');

        cli.getArgsParsed().should.deep.equal(
            new Map([['-f', ['jean$%&pomme.txt', 'to$%&lo$%&pomme.txt']]])
        );
    });

    it('-o should be mapped with output argument file', () => {
        cli.parse('-o "pomme.txt"');

        cli.getArgsParsed().should.deep.equal(new Map([['-o', ['pomme.txt']]]));
    });

    it('when key is not known return an error', () => {
        try {
            cli.parse('-pozerm "jean.txt"');
            expect.fail('test should fail, argument not known');
        } catch (e) {}
    });

    it('when string contain a boolean arg', () => {
        cli.parse('-f "jean pomme.txt" -c -f "to lo pomme.txt"');
        cli.getArgsParsed().should.deep.equal(
            new Map([
                ['-f', ['jean$%&pomme.txt', 'to$%&lo$%&pomme.txt']],
                ['-c', []],
            ])
        );
    });
});
