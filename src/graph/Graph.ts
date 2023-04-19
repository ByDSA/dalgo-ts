// eslint-disable-next-line import/no-cycle

// eslint-disable-next-line max-classes-per-file
import GraphNeighborsBehavior from "./GraphNeighborsBehavior";
import ISimpleMap from "./ISimpleMap";

export default abstract class Graph<N, L> implements ISimpleMap<L, N> {
  private neighbors: GraphNeighborsBehavior<L, N>;

  constructor(neighbors?: GraphNeighborsBehavior<L, N>) {
    this.neighbors = neighbors ?? new (class A implements GraphNeighborsBehavior<L, N> {
      // eslint-disable-next-line class-methods-use-this
      get(position: L): N[] {
        return This.calcNeighborsOf(position);
      }
    } )();

    const This = this;
  }

  getNeighborsOf(location: L): N[] {
    return this.neighbors.get(location);
  }

  abstract get(key: L): N;

  abstract set(key: L, value: N): void;

  protected abstract calcNeighborsOf(location: L): N[];
}