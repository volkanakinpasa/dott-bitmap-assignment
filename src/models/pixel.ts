import { Color } from '../enums';

export class Pixel {
  private readonly positionI: number;
  private readonly positionJ: number;
  private readonly color: Color;

  constructor(positionI: number, positionJ: number, color: Color) {
    this.color = color;
    this.positionI = positionI;
    this.positionJ = positionJ;
  }

  getPositionI = () => {
    return this.positionI;
  };

  getPositionJ = () => {
    return this.positionJ;
  };

  getColor = () => {
    return this.color;
  };
}
