import { LINE_BREAK, SPACE_CHAR } from './constants';

export const print = (outputParam: number[][][]): void => {
  const result: string = outputParam
    .map((bitmap) =>
      bitmap
        .map((line) => line.map((column) => column.toString()).join(SPACE_CHAR))
        .join(LINE_BREAK),
    )
    .join(`${LINE_BREAK}${LINE_BREAK}`);

  console.log(result);
};
