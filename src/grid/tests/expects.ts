/* eslint-disable import/prefer-default-export */
import { assertDefined } from "~/utils";
import { VectorN } from "../../vector";
import { expectVector } from "../../vector/tests";
import GridPoint from "../GridPoint";

export function expectGridPointPosition<D extends number>(gridPoint: GridPoint<D>, position: VectorN<D>) {
  assertDefined(gridPoint);

  expectVector(gridPoint.position, position);
}