import {
  EMPTY_CHAR,
  LIMITS,
  TEST_CASE_COUNT_OUT_OF_RANGE_ERROR_MESSAGE,
} from '../constants';
import { parseInput } from '../input';
import { TestCase } from '../interfaces';

const { MAX_PIXEL_COLUMN_SIZE, MAX_PIXEL_LINE_SIZE, MIN_PIXEL_COLUMN_SIZE } =
  LIMITS;

describe('input', () => {
  const testCaseCount: number = 2;

  let input: string = EMPTY_CHAR;

  beforeAll(() => {
    input = `
    ${testCaseCount.toString()}
    3 4
    0001
    0011
    0110
    
    2 8
    00010010
    00111100
    `;
  });

  it('test cases should not be null', () => {
    expect.assertions(1);
    const testCases: TestCase[] = parseInput(input);
    expect(testCases).not.toBeNull();
  });

  it('test cases count should match with input', () => {
    expect.assertions(1);
    const testCases: TestCase[] = parseInput(input);
    expect(testCases).toHaveLength(testCaseCount);
  });

  it('test cases count should match with expected range', () => {
    expect.assertions(2);
    const testCases: TestCase[] = parseInput(input);
    expect(testCases.length).toBeGreaterThanOrEqual(MIN_PIXEL_COLUMN_SIZE);
    expect(testCases.length).toBeLessThanOrEqual(MAX_PIXEL_LINE_SIZE);
  });

  it('line and column size should be in expected range', () => {
    expect.assertions(8);
    const testCases: TestCase[] = parseInput(input);
    testCases.forEach((testCase: TestCase): void => {
      expect(testCase.lineSize).toBeGreaterThanOrEqual(MIN_PIXEL_COLUMN_SIZE);
      expect(testCase.lineSize).toBeLessThanOrEqual(MAX_PIXEL_LINE_SIZE);
      expect(testCase.columnSize).toBeGreaterThanOrEqual(MIN_PIXEL_COLUMN_SIZE);
      expect(testCase.columnSize).toBeLessThanOrEqual(MAX_PIXEL_COLUMN_SIZE);
    });
  });

  it('line size should match with test case count', () => {
    expect.assertions(2);
    const testCases: TestCase[] = parseInput(input);
    testCases.forEach((testCase: TestCase): void => {
      expect(testCase.pixelNumbers).toHaveLength(testCase.lineSize);
    });
  });

  it('column size should match with each test case pixel count', () => {
    expect.assertions(5);
    const testCases: TestCase[] = parseInput(input);
    testCases.forEach((testCase: TestCase): void => {
      testCase.pixelNumbers.forEach((pixel: number[]): void => {
        expect(pixel).toHaveLength(testCase.columnSize);
      });
    });
  });

  it('error TestCaseCountOutOfRangeError', async () => {
    expect.assertions(1);
    input = `
    1001
    1 2
    10
    `;

    expect(() => {
      parseInput(input);
    }).toThrow(TEST_CASE_COUNT_OUT_OF_RANGE_ERROR_MESSAGE);
  });
});
