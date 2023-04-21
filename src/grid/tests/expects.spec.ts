import { GridPoint2DFourEdges } from "../edges";
import { expectGridPointPosition } from "./expects";

it("expectGridPointPosition", () => {
  const actual = new GridPoint2DFourEdges([1, 2]);

  expectGridPointPosition(actual, [1, 2]);
} );

it("expectGridPointPosition undefined", () => {
  const actual = undefined;

  expect(() => expectGridPointPosition(actual as any, [1, 2])).toThrow();
} );
