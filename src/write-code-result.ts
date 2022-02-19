import { computeChecksumValue, validCheckSum } from './checksum';

export const codeToResultFormat = (code: number[]): string => {
    const codeToString = code.reverse().join('');
    return validCheckSum(computeChecksumValue(code)) ? codeToString : codeToString + ' ERR';
};
