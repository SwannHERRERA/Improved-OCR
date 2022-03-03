import { computeChecksumValue, validCheckSum } from '../checksum';

// eslint-disable-next-line no-unused-vars
export type Validator = (code: string) => boolean;

export const illegalValidator: Validator = (code: string): boolean => {
    return !code.includes('?');
};

export const errorValidator: Validator = (code: string): boolean => {
    return validCheckSum(computeChecksumValue(code));
};
