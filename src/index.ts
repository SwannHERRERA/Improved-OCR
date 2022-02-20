import { parse, Parser } from './parser';

const paths = [
    'src/fixtures/all-digit.txt',
    'src/fixtures/complete-entries/two-complete-entries.txt',
];

const main = async (paths: string[]) => {
    let str = '';
    for (const path of paths) {
        str += await parse(path);
        if (path !== paths[paths.length - 1]) str += '\n';
    }

    const parser = new Parser(3, 4);
    console.log(parser.extractCodes(str));
};

main(paths);
