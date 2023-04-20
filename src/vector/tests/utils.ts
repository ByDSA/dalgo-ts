/* eslint-disable import/prefer-default-export */
import { VectorN } from "../Vector";
import { stringify } from "../stringify";

export function expectVector<D extends number>(actual: VectorN<D>, expected: VectorN<D>) {
  if (!actual || !expected)
    throw new Error("position is undefined");

  if (actual[0] !== expected[0] || actual[1] !== expected[1])
    throw new Error(`${stringify(actual)} is not ${stringify(expected)}`);
}