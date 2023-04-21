import { Grid2D, GridPoint2D } from "../../grid";
import AStar, { AStarParams, Heuristic } from "./AStar";

// for other heuristics visit - https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
const manhattanDistance: Heuristic<GridPoint2D> = (n0: GridPoint2D, n1: GridPoint2D) => {
  const d1 = Math.abs(n1.position[0] - n0.position[0]);
  const d2 = Math.abs(n1.position[1] - n0.position[1]);

  return d1 + d2;
};

// eslint-disable-next-line no-use-before-define
type Params = Omit<AStarParams<GridPoint2D>, "getNeighborsOf" | "h"> & {
  grid: Grid2D<GridPoint2D>;
  h?: Heuristic<GridPoint2D>;
};

export default class AStar2D extends AStar<GridPoint2D> {
  private grid: Grid2D<GridPoint2D>;

  constructor( { grid,
    start,
    end,
    h = manhattanDistance }: Params) {
    super( {
      start,
      end,
      h,
      getNeighborsOf: (node: GridPoint2D) => this.grid.getNeighborsOf(node.position),
    } );
    this.grid = grid;
  }

  getGrid() {
    return this.grid;
  }
}
