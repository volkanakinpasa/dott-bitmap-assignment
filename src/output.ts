import { LINE_BREAK, SPACE_CHAR } from './constants';

export const print = (outputParameter: number[][][]): void => {
  const result: string = outputParameter
    .map((bitmap: number[][]): string =>
      bitmap
        .map((line: number[]): string =>
          line
            .map((column: number): string => column.toString())
            .join(SPACE_CHAR),
        )
        .join(LINE_BREAK),
    )
    .join(`${LINE_BREAK}${LINE_BREAK}`);

  console.log(result);
};
