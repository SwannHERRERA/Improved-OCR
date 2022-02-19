import { numberToOcrReference } from './number-to-ocr-reference';

export const rowToOcrRepresentation = (code: number[]): string => {
    const ocr = code.map((number) => {
        return numberToOcrReference.get(number)?.split('\n').splice(1, 4) ?? '';
    });
    //console.log(keys[0].split('\n').splice(1, 4));

    let strTotal = '';
    for (let e = 0; e < 4; e++) {
        let strLine = '';
        for (let i = 0; i < ocr.length; i++) {
            strLine += ocr[i][e];
        }
        strTotal += strLine + '\n';
    }

    return strTotal;
};
