import { start } from './index';

describe('index', () => {
  it('parse', () => {
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
    start(input);
  });
});
