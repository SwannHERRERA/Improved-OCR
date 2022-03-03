const zero = `
 _ 
| |
|_|
   
`;

const one = `
   
  |
  |
   
`;
const two = `
 _ 
 _|
|_ 
   
`;
const three = `
 _ 
 _|
 _|
   
`;
const four = `
   
|_|
  |
   
`;
const five = `
 _ 
|_ 
 _|
   
`;
const six = `
 _ 
|_ 
|_|
   
`;
const sever = `
 _ 
  |
  |
   
`;
const height = `
 _ 
|_|
|_|
   
`;
const nine = `
 _ 
|_|
 _|
   
`;
export const OcrReferenceToNumber: Map<string, number> = new Map([
    [zero, 0],
    [one, 1],
    [two, 2],
    [three, 3],
    [four, 4],
    [five, 5],
    [six, 6],
    [sever, 7],
    [height, 8],
    [nine, 9],
]);

export const numberToOcrReference: Map<number, string> = new Map([
    [0, zero],
    [1, one],
    [2, two],
    [3, three],
    [4, four],
    [5, five],
    [6, six],
    [7, sever],
    [8, height],
    [9, nine],
]);
