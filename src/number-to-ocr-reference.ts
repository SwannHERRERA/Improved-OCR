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

export const numberToOcrReference: Map<string, number> = new Map([
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
