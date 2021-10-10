import { Color } from '../enums';
import { Bitmap, Pixel } from '../interfaces';
import { calculateDistances, createBitmap, createPixel } from '../utils';

describe('utils', () => {
  let pixels1: Pixel[];

  let pixels2: Pixel[];

  let bitmaps: Bitmap[];

  const firstBitmapLineLength = 3;
  const firstBitmapColumnLength = 4;
  const secondBitmapLineLength = 2;
  const secondBitmapColumnLength = 3;

  beforeAll(() => {
    //this can be auto mocked
    pixels1 = [
      createPixel(1, 1, Color.Black),
      createPixel(1, 2, Color.Black),
      createPixel(1, 3, Color.Black),
      createPixel(1, 4, Color.White),
      createPixel(2, 1, Color.Black),
      createPixel(2, 2, Color.Black),
      createPixel(2, 3, Color.White),
      createPixel(2, 4, Color.White),
      createPixel(3, 1, Color.Black),
      createPixel(3, 2, Color.White),
      createPixel(3, 3, Color.White),
      createPixel(3, 4, Color.Black),
    ];

    pixels2 = [
      createPixel(1, 1, Color.Black),
      createPixel(1, 2, Color.White),
      createPixel(1, 3, Color.Black),
      createPixel(2, 1, Color.Black),
      createPixel(2, 2, Color.Black),
      createPixel(2, 3, Color.White),
    ];

    bitmaps = [
      createBitmap(firstBitmapLineLength, firstBitmapColumnLength, pixels1),
      createBitmap(secondBitmapLineLength, secondBitmapColumnLength, pixels2),
    ];
  });

  it('output should be two cases', () => {
    expect.assertions(1);
    const output: number[][][] = calculateDistances(bitmaps);

    expect(output).toHaveLength(bitmaps.length);
  });

  it('output should match the correct line and column length', () => {
    expect.assertions(7);
    const output: number[][][] = calculateDistances(bitmaps);

    const [firstBitmap, secondBitmap] = output;

    expect(firstBitmap).toHaveLength(firstBitmapLineLength);
    expect(secondBitmap).toHaveLength(secondBitmapLineLength);

    firstBitmap.forEach((line) => {
      expect(line).toHaveLength(firstBitmapColumnLength);
    });

    secondBitmap.forEach((line) => {
      expect(line).toHaveLength(secondBitmapColumnLength);
    });
  });
});
