import { Color } from './enums';
import { Bitmap } from './models/bitmap';
import { Pixel } from './models/pixel';
import { PixelDistance, TestCases } from './types';

export const createBitmap = (testCases: TestCases): Bitmap => {
  const { lineSize, columnSize, pixelNumbers } = testCases;

  const pixels = pixelNumbers.flatMap((pixelRow, rowIndex) =>
    pixelRow.map((value, colIndex) =>
      createPixel(rowIndex + 1, colIndex + 1, value),
    ),
  );

  return new Bitmap(lineSize, columnSize, pixels);
};

export const createPixel = (
  positionX: number,
  positionY: number,
  value: number,
): Pixel =>
  new Pixel(positionX, positionY, !!value ? Color.White : Color.Black);

export const calculateDistances = (bitmap: Bitmap): Array<PixelDistance> => {
  const pixels: Array<Pixel> = bitmap.getPixels();

  return pixels.map((pixel, indexI) => {
    if (pixel.getColor() === Color.White) {
      return { pixel: pixel, distance: 0 };
    }

    const distance = getNearestDistanceNumber(pixels, indexI);
    return {
      pixel: pixels[indexI],
      distance,
    };
  });
};

//todo: this must be refactored eventually. maybe using reduce function.
const getNearestDistanceNumber = (
  pixels: Array<Pixel>,
  indexI: number,
): number => {
  let currentDistance: number;
  let nearestDistance: number;

  pixels.forEach((pixel, indexJ) => {
    if (pixel.getColor() === Color.White) {
      const distance =
        Math.abs(
          pixels[indexI].getPositionI() - pixels[indexJ].getPositionI(),
        ) +
        Math.abs(pixels[indexI].getPositionJ() - pixels[indexJ].getPositionJ());

      currentDistance = distance;
      if (!nearestDistance) {
        nearestDistance = distance;
      }

      if (distance <= nearestDistance) {
        nearestDistance = distance;
      }
    }
  });

  // for (let indexJ = 0; indexJ < pixels.length; indexJ++) {
  //   if (pixels[indexJ].getColor() === Color.White) {
  //     const distance =
  //       Math.abs(
  //         pixels[indexI].getPositionI() - pixels[indexJ].getPositionI(),
  //       ) +
  //       Math.abs(pixels[indexI].getPositionJ() - pixels[indexJ].getPositionJ());

  //     currentDistance = distance;
  //     if (!nearestDistance) {
  //       nearestDistance = distance;
  //     }

  //     if (distance <= nearestDistance) {
  //       nearestDistance = distance;
  //     }
  //   }
  // }
  return nearestDistance;
};
