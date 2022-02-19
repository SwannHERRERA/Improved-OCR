import { computeChecksumValue, validCheckSum } from './checksum';

export const codeToResultFormat = (code: number[]): string => {
    const codeToString = code.join('');
    const codeReplace = codeToString.replace(/-1/gm, '?');
    if (codeReplace.includes('?')) return codeReplace + ' ILL';
    return validCheckSum(computeChecksumValue(code)) ? codeToString : codeToString + ' ERR';
};
