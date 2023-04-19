/* eslint-disable import/prefer-default-export */
import { GridPoint } from "../../../grid";
import { expectGridPointPosition } from "../../../grid/tests/utils";
import { VectorN } from "../../../vector";
import { PathNode } from "../AStar";

export function expectPath<D extends number>(path: PathNode<GridPoint<D>>[], expected: VectorN<D>[]) {
  if (path.length !== expected.length)
    throw new Error(`path length is ${path.length} but expected ${expected.length}`);

  path.forEach((pathNode, index) => {
    expectGridPointPosition(pathNode.data, expected[index]);
  } );
}