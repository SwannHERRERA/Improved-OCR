import { numberToOcrReference } from './number-to-ocr-reference';

export const codeToOCRRepresentation = (code: number[]): string => {
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

/*import { numberToOcrReference } from './number-to-ocr-reference';

console.log(
    Array.from(numberToOcrReference.keys())[0].replace(/\n/, '') +
        Array.from(numberToOcrReference.keys())[1]
);
const keys = Array.from(numberToOcrReference.keys());
console.log(keys[0].split('\n').splice(1, 4));

let strTotal = '';
for (let e = 0; e < 4; e++) {
    let strLine = '';
    for (let i = 0; i < keys.length; i++) {
        strLine += keys[i].split('\n').splice(1, 4)[e];
    }
    strTotal += strLine + '\n';
}


console.log(strTotal);*/
