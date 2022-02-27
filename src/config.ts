import { CliFunctionnality } from './command-parser';

export const OUTPUT_DIR = '';

export const DIGIT_WIDTH = 3;
export const DIGIT_HEIGHT = 4;
export const FILE_INDEX_IN_COMMAND = 2;
export const argsConfigured = new Map<CliFunctionnality, string>([
    [CliFunctionnality.INPUT_FILE, '-f'],
    [CliFunctionnality.OUTPUT_FILE, '-o'],
    [CliFunctionnality.CONSOLE_OUTPUT, '-c'],
    [CliFunctionnality.HELPER, '-h']
]);
export const argsWithoutValues: CliFunctionnality[] = [CliFunctionnality.CONSOLE_OUTPUT, CliFunctionnality.HELPER];
