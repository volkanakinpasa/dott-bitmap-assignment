import { Color } from '../enums';

export class Pixel {
  private readonly positionX: number;
  private readonly positionY: number;
  private readonly color: Color;

  /**
   *
   */
  constructor(positionX: number, positionY: number, color: Color) {
    this.color = color;
    this.positionX = positionX;
    this.positionY = positionY;
  }
}
