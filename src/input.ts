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

  const testCaseLength = parseInt(lines[0]);

  if (testCaseLength === 0 || testCaseLength > 1000) {
    throw new Error('test case range must be 1≤t≤1000');
  }

  let testCases: Array<TestCases> = [];
  let currentLine = 1;
  for (let index = 0; index < testCaseLength; index++) {
    const [lineSize, columnSize] = lines[currentLine++]
      .trim()
      .split(' ')
      .map(parseInt);

    if (
      lineSize === 0 ||
      lineSize > 182 ||
      columnSize === 0 ||
      columnSize > 182
    ) {
      throw new Error('Bitmap sizes must be 1≤x≤182');
    }

    const pixelNumbers: number[][] = [];

    for (let rowIndex = 0; rowIndex < lineSize; rowIndex++) {
      const element = lines[currentLine++];

      pixelNumbers.push(
        element
          .trim()
          .split('')
          .map((item) => item.trim())
          .map(Number),
      );
    }

    testCases.push({
      lineSize,
      columnSize,
      pixelNumbers,
    });
  }

  return testCases;
};
