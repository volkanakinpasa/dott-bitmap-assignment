import { parseInput } from './input';
import { Bitmap } from './models/bitmap';
import { PixelDistance, TestCases } from './types';
import { calculateDistances, createBitmap } from './utils';

export const start = (input: string): void => {
  const testCases: Array<TestCases> = parseInput(input);

  const bitmaps: Array<Bitmap> = testCases.map(createBitmap);

  const pixelDistances: PixelDistance[][] = bitmaps.map((bitmap) =>
    calculateDistances(bitmap),
  );
};
