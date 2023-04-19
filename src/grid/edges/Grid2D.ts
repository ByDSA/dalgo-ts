// eslint-disable-next-line import/no-cycle
import Grid from "../Grid";
import GridPoint2D from "./GridPoint2D";

export default abstract class Grid2D<N extends GridPoint2D> extends Grid<2, N> {
}