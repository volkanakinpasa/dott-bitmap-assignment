import { PixelDistance } from './types';
import { calculateDistances } from './utils';
import { Bitmap } from './models/bitmap';
import { Pixel } from './models/pixel';
import { Color } from './enums';

describe('utils', () => {
  let pixels1: Array<Pixel>;

  let pixels2: Array<Pixel>;

  let bitmaps: Array<Bitmap>;

  const firstBitmapLineLength = 3;
  const firstBitmapColumnLength = 4;
  const secondBitmapLineLength = 2;
  const secondBitmapColumnLength = 3;

  beforeAll(() => {
    pixels1 = [
      new Pixel(1, 1, Color.Black),
      new Pixel(1, 2, Color.Black),
      new Pixel(1, 3, Color.Black),
      new Pixel(1, 4, Color.White),
      new Pixel(2, 1, Color.Black),
      new Pixel(2, 2, Color.Black),
      new Pixel(2, 3, Color.White),
      new Pixel(2, 4, Color.White),
      new Pixel(3, 1, Color.Black),
      new Pixel(3, 2, Color.White),
      new Pixel(3, 3, Color.White),
      new Pixel(3, 4, Color.Black),
    ];

    pixels2 = [
      new Pixel(1, 1, Color.Black),
      new Pixel(1, 2, Color.White),
      new Pixel(1, 3, Color.Black),
      new Pixel(2, 1, Color.Black),
      new Pixel(2, 2, Color.Black),
      new Pixel(2, 3, Color.White),
    ];

    bitmaps = [
      new Bitmap(firstBitmapLineLength, firstBitmapColumnLength, pixels1),
      new Bitmap(secondBitmapLineLength, secondBitmapColumnLength, pixels2),
    ];
  });

  it('output should be two cases', () => {
    const output: number[][][] = calculateDistances(bitmaps);

    expect(output).toHaveLength(bitmaps.length);
  });

  it('output should match the correct line and column length', () => {
    const output: number[][][] = calculateDistances(bitmaps);

    const [firstBitmap, secondBitmap] = output;
    console.log({ first: firstBitmap, second: secondBitmap });

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
