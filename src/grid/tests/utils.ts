/* eslint-disable import/prefer-default-export */
import { VectorN } from "../../vector";
import { expectVector } from "../../vector/tests/utils";
import GridPoint from "../GridPoint";

export function expectGridPointPosition<D extends number>(gridPoint: GridPoint<D>, position: VectorN<D>) {
  if (!gridPoint)
    throw new Error("node is undefined");

  expectVector(gridPoint.position, position);
}