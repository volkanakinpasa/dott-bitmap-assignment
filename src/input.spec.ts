import { parseInput } from '../src/input';

describe('input', () => {
  it('parse and validate', () => {
    const input = `
    2
    3 4
    0001
    0011
    0110
    
    2 8
    00010010
    00111100
    `;
    const testCases = parseInput(input);

    expect(testCases).not.toBeNull();
    expect(testCases).toHaveLength(2);
    testCases.forEach((testCase) => {
      expect(testCase.lineSize).toBeGreaterThanOrEqual(1);
      expect(testCase.lineSize).toBeLessThanOrEqual(182);
      expect(testCase.columnSize).toBeGreaterThanOrEqual(1);
      expect(testCase.columnSize).toBeLessThanOrEqual(182);
      expect(testCase.pixelNumbers).toHaveLength(testCase.lineSize);
      testCase.pixelNumbers.forEach((pixel) => {
        expect(pixel).toHaveLength(testCase.columnSize);
      });
    });
  });
});
