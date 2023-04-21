import { assertDefined } from "~/utils";
import { Vector2 } from "../../vector";
import Grid2D from "./Grid2D";
import GridPoint2D from "./GridPoint2D";
import { CanMove2DAxis, Edges2D, FourEdges2D } from "./types";

type NodeType = CanMove2DAxis & GridPoint2D;
type GridType<N extends NodeType = NodeType> = Grid2D<N>;

export interface EdgesBehavior<P, E> {
  addTwoWayFlatWallAt(position: P, ...edges: E[]): void;
  addTwoWayFlatWallAtRightOf(position: P): void;
  addTwoWayFlatWallAtBottomOf(position: P): void;
}

export type FourEdgesBehavior<E> = EdgesBehavior<Vector2, E>;

export default class FourEdgesGridBehavior<
  N extends NodeType,
  G extends GridType<N> = GridType<N>
> implements FourEdgesBehavior<FourEdges2D> {
  private grid: G | undefined;

  setGrid(grid: G) {
    this.grid = grid;
  }

  addTwoWayFlatWallAt(position: Vector2, ...edges: FourEdges2D[]) {
    assertDefined(this.grid);
    const selfNode = this.grid.get(position);

    for (const edge of edges) {
      let otherPosition: Vector2;

      switch (edge) {
        case Edges2D.Right:
          otherPosition = [position[0] + 1, position[1]];
          selfNode?.setCanMoveRight(false);
          this.grid.get(otherPosition)?.setCanMoveLeft(false);
          break;
        case Edges2D.Left:
          otherPosition = [position[0] - 1, position[1]];
          selfNode?.setCanMoveLeft(false);
          this.grid.get(otherPosition)?.setCanMoveRight(false);
          break;
        case Edges2D.Top:
          otherPosition = [position[0], position[1] - 1];
          selfNode?.setCanMoveTop(false);
          this.grid.get(otherPosition)?.setCanMoveBottom(false);
          break;
        case Edges2D.Bottom:
          otherPosition = [position[0], position[1] + 1];
          selfNode?.setCanMoveBottom(false);
          this.grid.get(otherPosition)?.setCanMoveTop(false);
          break;
        default:
          throw new Error("Invalid edge");
      }
    }
  }

  addTwoWayFlatWallAtRightOf(position: Vector2) {
    this.addTwoWayFlatWallAt(position, Edges2D.Right);
  }

  addTwoWayFlatWallAtBottomOf(position: Vector2) {
    this.addTwoWayFlatWallAt(position, Edges2D.Bottom);
  }

  // eslint-disable-next-line class-methods-use-this
  calcNeighborsOf(position: Vector2) {
    assertDefined(this.grid);
    const neighborList: N[] = [];
    const node: N = this.grid.get(position);

    if (!node)
      throw new Error(`Node not found at position ${position}`);

    const [x, y] = position;

    if (node.canMoveRight() && x < this.grid.size[0] - 1)
      neighborList.push(this.grid.get([x + 1, y]));

    if (node.canMoveLeft() && x > 0)
      neighborList.push(this.grid.get([x - 1, y]));

    if (node.canMoveBottom() && y < this.grid.size[1] - 1)
      neighborList.push(this.grid.get([x, y + 1]));

    if (node.canMoveTop() && y > 0)
      neighborList.push(this.grid.get([x, y - 1]));

    return neighborList;
  }
}
