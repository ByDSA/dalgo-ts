import { GridPoint } from "../../../grid";
import { expectGridPointPosition } from "../../../grid/tests";
import { VectorN } from "../../../vector";
import { PathNode } from "../AStar";

export function expectPath<D extends number>(
  path: PathNode<GridPoint<D>>[],
  expected: VectorN<D>[],
) {
  if (path.length !== expected.length)
    throw new Error(`path length is ${path.length} but expected ${expected.length}`);

  path.forEach((pathNode, index) => {
    expectGridPointPosition(pathNode.data, expected[index]);
  } );
}

export function showPath<D extends number>(path: PathNode<GridPoint<D>>[]) {
  for (let i = 0; i < path.length; i++)
    // eslint-disable-next-line no-console
    console.log(...path[i].data.position);
}
