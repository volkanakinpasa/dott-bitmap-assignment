import { parseInput } from './input';
import { Bitmap } from './models/bitmap';
import { print } from './output';
import { TestCases } from './types';
import { calculateDistances, createBitmap } from './utils';

export const start = (input: string): void => {
  const testCases: Array<TestCases> = parseInput(input);

  const bitmaps: Array<Bitmap> = testCases.map(createBitmap);

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
