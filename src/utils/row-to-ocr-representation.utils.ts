import { DIGIT_WIDTH } from '../config/config';
import { numberToOcrReference } from '../config/number-to-ocr-reference';
import { Writer } from '../writer/writer';

export const rowToOcrRepresentation = (code: number[]): string => {
    const ocr = code.map((number) => {
        return numberToOcrReference.get(number)?.split('\n').splice(1, 4) ?? '';
    });

    let strTotal = '';
    for (let e = 0; e < 4; e++) {
        let strLine = '';
        for (let i = 0; i < ocr.length; i++) {
            strLine += ocr[i][e];
        }
        if (e < 3) {
            strTotal += strLine + '\n';
        } else {
            strTotal += ' '.repeat(DIGIT_WIDTH * 9);
        }
    }

    return strTotal;
};

export const constrcutOneHundredOCREntries = async (writer: Writer) => {
    const str: string[] = [];
    for (let i = 0; i < 20; i++) {
        str.push(rowToOcrRepresentation([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        str.push(rowToOcrRepresentation([1, 6, 3, 3, 5, 8, 7, 8, 9]));
        str.push(rowToOcrRepresentation([7, 3, 3, 3, 5, 8, 2, 8, 0]));
        str.push(rowToOcrRepresentation([7, 3, 4, 9, 5, 8, 2, 6, 0]));
        str.push(rowToOcrRepresentation([7, 1, 4, 1, 2, 8, 2, 6, 0]));
    }
    writer.write(str);
};
