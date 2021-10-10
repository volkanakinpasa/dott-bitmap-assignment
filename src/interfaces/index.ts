import { Color } from '../enums';

export interface TestCase {
  columnSize: number;
  lineSize: number;
  pixelNumbers: number[][];
}

export interface PixelDistance {
  distance: number;
  pixel: Pixel;
}

export interface CalculatedBitmapPixelDistance {
  bitmap: Bitmap;
  pixelDistances: PixelDistance[];
}

export interface Pixel {
  color: Color;
  positionI: number;
  positionJ: number;
}

export interface Bitmap {
  columnSize: number;
  lineSize: number;
  pixels: Pixel[];
}
