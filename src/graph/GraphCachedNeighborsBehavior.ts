// eslint-disable-next-line max-classes-per-file
import GraphNeighborsBehavior from "./GraphNeighborsBehavior";
import ISimpleMap from "./ISimpleMap";

export default abstract class GraphCachedNeighborsBehavior<L, N>
implements GraphNeighborsBehavior<L, N> {
  private readonly cache: ISimpleMap<L, N[]>;

  constructor() {
    this.cache = new Map();
  }

  /**
   *
   * @deprecated Use getOrCalc instead
   */
  get(location: L): N[] {
    return this.getOrCalc(location);
  }

  getOrCalc(location: L): N[] {
    const cached = this.cache.get(location);

    if (cached)
      return cached;

    const neighbors = this.calcNeighborsOf(location);

    this.cache.set(location, neighbors);

    return neighbors;
  }

  set(location: L, node: N[]): void {
    this.cache.set(location, node);
  }

  protected abstract calcNeighborsOf(location: L): N[];
}
