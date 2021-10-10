import {
  EMPTY_CHAR,
  LIMITS,
  SPACE_CHAR,
  TEST_CASE_BITMAP_SIZE_OUT_OF_RANGE_ERROR_MESSAGE,
  TEST_CASE_COUNT_OUT_OF_RANGE_ERROR_MESSAGE,
} from './constants';
import { TestCaseBitmapSizeOutOfRangeError } from './errors/testCaseBitmapSizeOutOfRangeError';
import { TestCaseCountOutOfRangeError } from './errors/testCaseCountOutOfRangeError';
import { TestCase } from './interfaces';

const {
  MAX_TEST_CASE_COUNT,
  MAX_PIXEL_LINE_SIZE,
  MAX_PIXEL_COLUMN_SIZE,
  MIN_PIXEL_COLUMN_SIZE,
  MIN_PIXEL_LINE_SIZE,
} = LIMITS;

const parseInt = (input: string): number => {
  return Number(input);
};

const getLines = (input: string): string[] => {
  return (
    input
      .trim()
      // eslint-disable-next-line require-unicode-regexp
      .split(/\r?\n/)
      .filter((line: string): string => line.trim())
  );
};

const validateTestCaseCount = (testCaseCount: number): never | void => {
  if (testCaseCount === 0 || testCaseCount > MAX_TEST_CASE_COUNT) {
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
    lineSize < MIN_PIXEL_LINE_SIZE ||
    lineSize > MAX_PIXEL_LINE_SIZE ||
    columnSize < MIN_PIXEL_COLUMN_SIZE ||
    columnSize > MAX_PIXEL_COLUMN_SIZE
  ) {
    throw new TestCaseBitmapSizeOutOfRangeError(
      TEST_CASE_BITMAP_SIZE_OUT_OF_RANGE_ERROR_MESSAGE,
    );
  }
};

const parseLinesIntoTestCases = (
  testCaseCount: number,
  lines: string[],
): TestCase[] => {
  // eslint-disable-next-line immutable/no-let
  let currentLineIndex = 0;

  return Array.apply(null, { length: testCaseCount }).map((): TestCase => {
    currentLineIndex++;
    const [lineSize, columnSize] = lines[currentLineIndex]
      .trim()
      .split(SPACE_CHAR)
      .map(parseInt);

    validateLineColumnSize(lineSize, columnSize);

    const pixelNumbers: number[][] = Array.apply(null, {
      length: lineSize,
    }).map((): number[] => {
      currentLineIndex++;
      const line = lines[currentLineIndex];

      return line
        .trim()
        .split(EMPTY_CHAR)
        .map((item: string): string => item.trim())
        .map(Number);
    });

    return {
      columnSize,
      lineSize,
      pixelNumbers,
    };
  });
};

export const parseInput = (input: string): TestCase[] => {
  const lines: string[] = getLines(input);

  const testCaseCount = parseInt(lines[0]);

  validateTestCaseCount(testCaseCount);

  return parseLinesIntoTestCases(testCaseCount, lines);
};
