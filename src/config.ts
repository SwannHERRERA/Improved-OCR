import { CliFunctionnality } from "./cli";

export const DIGIT_WIDTH = 3;
export const DIGIT_HEIGHT = 4;
export const argsConfigured = new Map<CliFunctionnality, string>([
    [CliFunctionnality.INPUT_FILE, '-f'],
    [CliFunctionnality.OUTPUT_FILE, '-o'],
    [CliFunctionnality.CONSOLE_OUTPUT, '-c']
]);
