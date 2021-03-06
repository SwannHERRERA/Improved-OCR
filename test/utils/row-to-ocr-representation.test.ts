import { rowToOcrRepresentation } from '../../src/utils/row-to-ocr-representation.utils';

describe('test code-to-ocr-representation', () => {
    it('code 123456789 should return the same in ocr reprsentation', () => {
        const ocrRespresentation = `    _  _     _  _  _  _  _ 
  | _| _||_||_ |_   ||_||_|
  ||_  _|  | _||_|  ||_| _|
                           `;
        const res = rowToOcrRepresentation([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        res.should.equal(ocrRespresentation);
    });
});
