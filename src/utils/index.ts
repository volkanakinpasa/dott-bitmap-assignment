import { Color } from '../enums';
import {
  Bitmap,
  CalculatedBitmapPixelDistance,
  Pixel,
  PixelDistance,
  TestCase,
} from '../interfaces';

export const createPixel = (
  positionI: number,
  positionJ: number,
  color: Color,
): Pixel => {
  return { color, positionI, positionJ };
};

export const createBitmap = (
  lineSize: number,
  columnSize: number,
  pixels: Pixel[],
): Bitmap => {
  return { columnSize, lineSize, pixels };
};

export const convertTestCaseToBitmap = (testCase: TestCase): Bitmap => {
  const { lineSize, columnSize, pixelNumbers } = testCase;

  const pixels = pixelNumbers.flatMap(
    (pixelRow: number[], rowIndex: number): Pixel[] =>
      pixelRow.map(
        (value: number, colIndex: number): Pixel =>
          createPixel(
            rowIndex + 1,
            colIndex + 1,
            value > 0 ? Color.White : Color.Black,
          ),
      ),
  );

  return createBitmap(lineSize, columnSize, pixels);
};

// Todo: this must be refactored eventually. maybe using reduce function.
const getNearestDistanceNumber = (pixels: Pixel[], indexI: number): number => {
  let nearestDistance: number;

  pixels.forEach((pixel: Pixel, indexJ: number): void => {
    if (pixel.color === Color.White) {
      const distance =
        Math.abs(pixels[indexI].positionI - pixels[indexJ].positionI) +
        Math.abs(pixels[indexI].positionJ - pixels[indexJ].positionJ);

      if (nearestDistance === undefined) {
        nearestDistance = distance;
      }

      if (distance <= nearestDistance) {
        nearestDistance = distance;
      }
    }
  });

  return nearestDistance;
};

const calculateDistance = (bitmap: Bitmap): PixelDistance[] => {
  const { pixels } = bitmap;

  return pixels.map((pixel: Pixel, indexI: number): PixelDistance => {
    if (pixel.color === Color.White) {
      return { distance: 0, pixel };
    }

    const distance = getNearestDistanceNumber(pixels, indexI);

    return {
      distance,
      pixel: pixels[indexI],
    };
  });
};

export const calculateDistances = (bitmaps: Bitmap[]): number[][][] => {
  const calculatedBitmapPixelDistances: CalculatedBitmapPixelDistance[] =
    bitmaps.map((bitmap: Bitmap): CalculatedBitmapPixelDistance => {
      const pixelDistances: PixelDistance[] = calculateDistance(bitmap);

      return { bitmap, pixelDistances };
    });

  // Todo: refactor this.
  const result = calculatedBitmapPixelDistances.map(
    (item: CalculatedBitmapPixelDistance): number[][] => {
      const array: number[][] = [];

      for (let indexLine = 0; indexLine < item.bitmap.lineSize; indexLine++) {
        array[indexLine] = [];

        for (
          let indexColumn = 0;
          indexColumn < item.bitmap.columnSize;
          indexColumn++
        ) {
          const { distance } = item.pixelDistances.find(
            (pixelDistance: PixelDistance): boolean =>
              pixelDistance.pixel.positionI === indexLine + 1 &&
              pixelDistance.pixel.positionJ === indexColumn + 1,
          );
          array[indexLine].push(distance);
        }
      }

      return array;
    },
  );

  return result;
};
