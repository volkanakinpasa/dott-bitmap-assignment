import { parseInput } from '../src/input';
import {
  EMPTY_CHAR,
  TEST_CASE_COUNT_OUT_OF_RANGE_ERROR_MESSAGE,
} from './constants';
import { TestCases } from './types';

describe('input', () => {
  const testCaseCount = 2;

  let input: string = EMPTY_CHAR;

  beforeAll(() => {
    input = `
    ${testCaseCount}
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
    const testCases: Array<TestCases> = parseInput(input);
    expect(testCases).not.toBeNull();
  });

  it('test cases count should match with input', () => {
    const testCases: Array<TestCases> = parseInput(input);
    expect(testCases).toHaveLength(testCaseCount);
  });

  it('test cases count should match with expected range', () => {
    const testCases: Array<TestCases> = parseInput(input);
    expect(testCases.length).toBeGreaterThanOrEqual(1);
    expect(testCases.length).toBeLessThanOrEqual(182);
  });

  it('line and column size should be in expected range', () => {
    const testCases: Array<TestCases> = parseInput(input);
    testCases.forEach((testCase) => {
      expect(testCase.lineSize).toBeGreaterThanOrEqual(1);
      expect(testCase.lineSize).toBeLessThanOrEqual(182);
      expect(testCase.columnSize).toBeGreaterThanOrEqual(1);
      expect(testCase.columnSize).toBeLessThanOrEqual(182);
    });
  });

  it('line size should match with test case count ', () => {
    const testCases: Array<TestCases> = parseInput(input);
    testCases.forEach((testCase) => {
      expect(testCase.pixelNumbers).toHaveLength(testCase.lineSize);
    });
  });

  it('column size should match with each test case pixel count', () => {
    const testCases: Array<TestCases> = parseInput(input);
    testCases.forEach((testCase) => {
      testCase.pixelNumbers.forEach((pixel) => {
        expect(pixel).toHaveLength(testCase.columnSize);
      });
    });
  });

  it('error TestCaseCountOutOfRangeError', async () => {
    input = `
    1001
    1 2
    10

    `;

    await expect(() => {
      parseInput(input);
    }).toThrow(TEST_CASE_COUNT_OUT_OF_RANGE_ERROR_MESSAGE);
  });

  //todo: add other error test cases.
});
