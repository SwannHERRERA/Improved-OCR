import { computeChecksumValue, validCheckSum } from './checksum';

export const codeToResultFormat = (code: number[]): string => {
    const codeToString = code.join('');
    return validCheckSum(computeChecksumValue(code)) ? codeToString : codeToString + ' ERR';
};
