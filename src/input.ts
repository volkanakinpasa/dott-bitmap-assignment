import {
  EMPTY_CHAR,
  SPACE_CHAR,
  TEST_CASE_BITMAP_SIZE_OUT_OF_RANGE_ERROR_MESSAGE,
  TEST_CASE_COUNT_OUT_OF_RANGE_ERROR_MESSAGE,
} from './constants';
import {
  TestCaseBitmapSizeOutOfRangeError,
  TestCaseCountOutOfRangeError,
} from './error';
import { TestCases } from './types';

const parseInt = (input: string) => {
  return Number(input);
};

const getLines = (input: string): string[] => {
  return input
    .trim()
    .split(/\r?\n/)
    .filter((line) => line.trim());
};

export const parseInput = (input: string): TestCases[] => {
  const lines: string[] = getLines(input);

  const testCaseCount = parseInt(lines[0]);

  validateTestCaseCount(testCaseCount);

  return parseLinesIntoTestCases(testCaseCount, lines);
};

const validateTestCaseCount = (testCaseCount: number): never | void => {
  if (testCaseCount === 0 || testCaseCount > 1000) {
    throw new TestCaseCountOutOfRangeError(
      TEST_CASE_COUNT_OUT_OF_RANGE_ERROR_MESSAGE,
    );
  }
};
const validateLineColumnSize = (
  lineSize: number,
  columnSize: number,
): never | void => {
  if (
    lineSize === 0 ||
    lineSize > 182 ||
    columnSize === 0 ||
    columnSize > 182
  ) {
    throw new TestCaseBitmapSizeOutOfRangeError(
      TEST_CASE_BITMAP_SIZE_OUT_OF_RANGE_ERROR_MESSAGE,
    );
  }
};

const parseLinesIntoTestCases = (
  testCaseCount: number,
  lines: string[],
): Array<TestCases> => {
  let currentLineIndex = 0;

  const cases = Array.apply(null, { length: testCaseCount }).map(() => {
    currentLineIndex++;
    const [lineSize, columnSize] = lines[currentLineIndex]
      .trim()
      .split(SPACE_CHAR)
      .map(parseInt);

    validateLineColumnSize(lineSize, columnSize);

    const pixelNumbers: number[][] = Array.apply(null, {
      length: lineSize,
    }).map(() => {
      currentLineIndex++;
      const line = lines[currentLineIndex];

      return line
        .trim()
        .split(EMPTY_CHAR)
        .map((item) => item.trim())
        .map(Number);
    });

    return {
      lineSize,
      columnSize,
      pixelNumbers,
    };
  });
  return cases;
};
