import { parseInput } from './input';
import { Bitmap, TestCase } from './interfaces';
import { print } from './output';
import { calculateDistances, convertTestCaseToBitmap } from './utils';

export const start = (input: string): void => {
  const testCases: TestCase[] = parseInput(input);

  const bitmaps: Bitmap[] = testCases.map(convertTestCaseToBitmap);

  const output: number[][][] = calculateDistances(bitmaps);

  print(output);
};

const input = `
2
3 4
0001
0011
0110

2 8
00010010
00111100
`;

start(input);
