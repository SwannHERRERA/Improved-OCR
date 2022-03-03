import { CliFunctionnality } from '../parsing/command-parser';
import { errorValidator, illegalValidator } from '../validation/validators';

export const OUTPUT_DIR = '';

export const DIGIT_WIDTH = 3;
export const DIGIT_HEIGHT = 4;
export const LINE_NUMBER_DIGIT = 9;
export const FILE_INDEX_IN_COMMAND = 2;
export const argsConfigured = new Map<CliFunctionnality, string>([
    [CliFunctionnality.INPUT_FILE, '-f'],
    [CliFunctionnality.OUTPUT_FILE, '-o'],
    [CliFunctionnality.CONSOLE_OUTPUT, '-c'],
    [CliFunctionnality.HELPER, '-h'],
]);
export const argsWithoutValues: CliFunctionnality[] = [
    CliFunctionnality.CONSOLE_OUTPUT,
    CliFunctionnality.HELPER,
];
export const validators = new Map([
    [' ILL', illegalValidator],
    [' ERR', errorValidator],
]);

export const textHelpers = [
    'usage: ./src/main.ts -f FileInputPath ...',
    'translate ocr files to number representation in three files Authorized Errored Unknown (you can specify multiple input files)\n',
    'usage: ./src/main.ts -f FilePath -o fileouputPath ...',
    'translate ocr file to number representation in the ouput file corresponding (you can specify multiple conbinations)\n',
    'usage: ./src/main.ts -c -f FilePath ...',
    'translate ocr file to number representation in the console (you can specify multiple input files)\n',
    'optional arguments:',
    '   -h                show this help message and exit',
    '   -c CONSOLE        specify to ouput in console',
    '   -f INPUT_FILE     specify the input file path with OCR text',
    '   -o OUTPUT_FILE    specify the ouput file path create or not',
];
