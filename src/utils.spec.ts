import { PixelDistance } from './types';
import { calculateDistances } from './utils';
import { Bitmap } from './models/bitmap';
import { Pixel } from './models/pixel';
import { Color } from './enums';

describe('utils', () => {
  beforeAll(() => {});

  it('distances should match with the single line', () => {
    const pixels: Array<Pixel> = [
      new Pixel(1, 1, Color.Black),
      new Pixel(1, 2, Color.Black),
      new Pixel(1, 3, Color.Black),
      new Pixel(1, 4, Color.White),
    ];

    const bitmap: Bitmap = new Bitmap(1, 4, pixels);
    const distances: Array<PixelDistance> = calculateDistances(bitmap);

    expect(distances[0].distance).toBe(3);
    expect(distances[1].distance).toBe(2);
    expect(distances[2].distance).toBe(1);
    expect(distances[3].distance).toBe(0);
  });
});
