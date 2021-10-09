import { Color } from './enums';
import { parseInput } from './input';
import { Bitmap } from './models/bitmap';
import { Pixel } from './models/pixel';
import { TestCases } from './types';

export const start = (input: string) => {
  const testCases = parseInput(input);

  const bitmaps: Array<Bitmap> = testCases.map(createBitmap);

  bitmaps.map((bitmap) => calculateDistance(bitmaps));
};

const calculateDistance = (bitmaps: Bitmap[]): number[][] => {
  throw new Error('Function not implemented.');
};

const createBitmap = (testCases: TestCases): Bitmap => {
  const { lineSize, columnSize, pixelNumbers } = testCases;

  const pixels = pixelNumbers.flatMap((pixelRow, rowIndex) =>
    pixelRow.map((value, colIndex) =>
      convertTextCasePixelIntoPixel(rowIndex + 1, colIndex + 1, value),
    ),
  );

  return new Bitmap(lineSize, columnSize, pixels);
};

const convertTextCasePixelIntoPixel = (
  positionX: number,
  positionY: number,
  value: number,
) => new Pixel(positionX, positionY, !!value ? Color.White : Color.Black);
