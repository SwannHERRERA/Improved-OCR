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

export const numberToOcrReference: Map<number, string> = new Map([
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
