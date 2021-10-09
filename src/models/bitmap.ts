import { Pixel } from './pixel';

export class Bitmap {
  private readonly columnSize: number;
  private readonly lineSize: number;
  private readonly pixels: Array<Pixel>;

  /**
   *
   */
  constructor(lineSize: number, columnSize: number, pixels: Array<Pixel>) {
    this.lineSize = lineSize;
    this.columnSize = columnSize;
    this.pixels = pixels;
  }

  public getLineSize() {
    return this.lineSize;
  }
  public getColumnSize() {
    return this.columnSize;
  }

  public getPixels() {
    return this.pixels;
  }
}
