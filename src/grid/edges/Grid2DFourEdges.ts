import { Vector2 } from "../../vector";
import FourEdgesGridBehavior, { FourEdgesBehavior } from "./FourEdgesGridBehavior";
import Grid2D from "./Grid2D";
import GridPoint2DFourEdges from "./GridPoint2DFourEdges";
import { FourEdges2D } from "./types";

export default class Grid2DFourEdges
  extends Grid2D<GridPoint2DFourEdges>
  implements FourEdgesBehavior<FourEdges2D> {
  protected fourEdges:
  FourEdgesGridBehavior<GridPoint2DFourEdges, this> = new FourEdgesGridBehavior();

  // eslint-disable-next-line class-methods-use-this
  protected createNode(position: Vector2): GridPoint2DFourEdges {
    return new GridPoint2DFourEdges(position);
  }

  init(): void {
    super.init();
    this.fourEdges.setGrid(this);
  }

  addTwoWayFlatWallAt(position: Vector2, ...edges: FourEdges2D[]): void {
    this.fourEdges.addTwoWayFlatWallAt(position, ...edges);
  }

  addTwoWayFlatWallAtRightOf(position: Vector2) {
    this.fourEdges.addTwoWayFlatWallAtRightOf(position);
  }

  addTwoWayFlatWallAtBottomOf(position: Vector2) {
    this.fourEdges.addTwoWayFlatWallAtBottomOf(position);
  }

  calcNeighborsOf(position: Vector2) {
    const neighborList: GridPoint2DFourEdges[] = [];
    const fourEdgedNeighbors = this.fourEdges.calcNeighborsOf(position);

    neighborList.push(...fourEdgedNeighbors);

    return neighborList;
  }
}
