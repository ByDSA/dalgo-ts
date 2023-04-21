/* eslint-disable import/prefer-default-export */
import { VectorN } from "../Vector";

export function expectVector<D extends number>(actual: VectorN<D>, expected: VectorN<D>) {
  if (!actual || !expected)
    throw new Error("actual or expected are undefined");

  expect(actual).toEqual(expected);
}
