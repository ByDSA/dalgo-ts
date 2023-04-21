import { VectorN } from "../vector";

// constructor function to create all the grid points as objects containind the data for the points
export default abstract class GridPoint<D extends number> {
  position: VectorN<D>;

  constructor(position: VectorN<D>) {
    this.position = [...position]; // location of the grid point
  }
}
