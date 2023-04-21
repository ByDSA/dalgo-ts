// eslint-disable-next-line max-classes-per-file
import { assertDefined } from "~/utils/asserts";
import { Graph, GraphCachedNeighborsBehavior, GraphNeighborsBehavior } from "../graph";
import { MultiArray } from "../multi-array";
import { VectorN } from "../vector";
import GridPoint from "./GridPoint";

type GridParams<D extends number, N extends GridPoint<D>> = {
  size: VectorN<D>;
  neighbors?: GraphNeighborsBehavior<VectorN<D>, N>;
};

export default abstract class Grid<D extends number, N extends GridPoint<D> = GridPoint<D>> extends Graph<N, VectorN<D>> {
  readonly size: VectorN<D>;

  protected content!: MultiArray.Type<N, D>;

  constructor( {size, neighbors}: GridParams<D, N>) {
    const n: GraphNeighborsBehavior<VectorN<D>, N> = neighbors ?? new (class A extends GraphCachedNeighborsBehavior<VectorN<D>, N> {
      // eslint-disable-next-line class-methods-use-this
      calcNeighborsOf(position: VectorN<D>): N[] {
        return This.calcNeighborsOf(position);
      }
    } )();

    super(n);
    const This = this;

    this.size = size;
  }

  private assertInitialized() {
    try {
      assertDefined(this.content);
    } catch (e) {
      throw new Error("Grid not initialized. Call init method first.");
    }
  }

  get(location: VectorN<D>): N {
    this.assertInitialized();

    return MultiArray.get<N, D>(this.content, ...location);
  }

  set(location: VectorN<D>, node: N): void {
    this.assertInitialized();

    MultiArray.set<N, D>(this.content, node, ...location);
  }

  init() {
    const initializator: MultiArray.Initializator<N, D> = (position: VectorN<D>) => this.createNode(position);

    this.content = MultiArray.create<N, D>(initializator, ...this.size) as MultiArray.Type<N, D>;
  }

  protected abstract createNode(position: VectorN<D>): N;
}