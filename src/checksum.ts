export const computeChecksumValue = (code: number[]): number => {
    return (
        code.reverse().reduce((previousValue, value, index) => {
            return previousValue + value * (index + 1);
        }, 0) 
    );
};

export const validCheckSum = (checksum: number): boolean => {
    return checksum % 11 === 0;
};
