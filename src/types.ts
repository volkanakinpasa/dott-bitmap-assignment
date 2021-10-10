import { Pixel } from './models/pixel';

export type TestCases = {
  lineSize: number;
  columnSize: number;
  pixelNumbers: number[][];
};

export type PixelDistance = { pixel: Pixel; distance: number };
