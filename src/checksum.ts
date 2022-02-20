export const computeChecksumValue = (code: string): number => {
    const codeClone = code
        .split('')
        .map((x) => Number.parseInt(x))
        .reverse();
    return codeClone.reduce((previousValue, value, index) => {
        return previousValue + value * (index + 1);
    }, 0);
};

export const validCheckSum = (checksum: number): boolean => {
    return checksum % 11 === 0;
};
