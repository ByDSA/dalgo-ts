import AStarNode from "./AStarNode";
import BiMapNodeData from "./BiMapNodeData";

// eslint-disable-next-line no-use-before-define
export type AStarNodeFunc<T> = (node0: AStarNode, node1: AStarNode, aStar: AStar<T>)=> number;

// eslint-disable-next-line no-use-before-define
export type Heuristic<T, A extends AStar<T> = AStar<T>> = (data0: T, data1: T, aStar: A)=> number;

// eslint-disable-next-line no-use-before-define
export type GetNeighborsOf<T, A = AStar<T>> = (data: T, aStar: A)=> T[];

export type PathNode<T> = {
  node: AStarNode;
  data: T;
};

type Params<T> = {
  start: T;
  end: T;
  h: Heuristic<T>;
  g?: AStarNodeFunc<T>;
  getNeighborsOf: GetNeighborsOf<T>;
};

export default abstract class AStar<T> {
  private start!: AStarNode;

  startData: T;

  endData: T;

  private openList!: AStarNode[]; // array containing unevaluated grid points

  private closedSet!: Set<AStarNode>; // set containing completely evaluated grid points

  private h: Heuristic<T>; // heuristic

  private g: AStarNodeFunc<T>;

  private resultPath: PathNode<T>[] = [];

  private getNeighborsOf: GetNeighborsOf<T, this>;

  private nodeDataBiMap = new BiMapNodeData<T>();

  constructor( { start, end, h, g, getNeighborsOf }: Params<T>) {
    this.startData = start;
    this.endData = end;
    this.h = h;
    this.g = g ?? defaultCalcG;
    this.getNeighborsOf = getNeighborsOf;
  }

  private getOrCreateNode(data: T) {
    let node = this.nodeDataBiMap.getNodeByData(data);

    if (!node) {
      node = new AStarNode();
      this.nodeDataBiMap.setNodeData(node, data);
    }

    return node;
  }

  getDataByNode(node: AStarNode) {
    return this.nodeDataBiMap.getDataByNode(node) as T;
  }

  // initializing the grid
  protected init() {
    this.closedSet = new Set();
    this.nodeDataBiMap.clear();
    this.start = this.getOrCreateNode(this.startData);
    this.openList = [this.start];
    this.resultPath = [];
  }

  protected isEnd(data: T) {
    return data === this.endData;
  }

  // A star search implementation
  search() {
    this.init();

    while (this.openList.length > 0) {
    // assumption lowest index is the first one to begin with
      let lowestIndex = 0;
      let lowestIndexNode = this.openList[lowestIndex];

      this.openList.forEach((node, index) => {
        if (node.f < lowestIndexNode.f) {
          lowestIndex = index;
          lowestIndexNode = node;
        }
      } );

      const current = lowestIndexNode;
      const currentData = this.nodeDataBiMap.getDataByNode(current) as T;

      if (this.isEnd(currentData)) {
        let temp = current;

        this.resultPath.push( {
          node: temp,
          data: this.nodeDataBiMap.getDataByNode(temp) as T,
        } );

        while (temp.parent) {
          this.resultPath.push( {
            node: temp.parent,
            data: this.nodeDataBiMap.getDataByNode(temp.parent) as T,
          } );
          temp = temp.parent;
        }

        // return the traced path
        return this.resultPath.reverse();
      }

      // remove current from openSet
      this.openList.splice(lowestIndex, 1);
      // add current to closedSet
      this.closedSet.add(current);

      const neighborsData = this.getNeighborsOf(currentData, this);

      for (const neighborData of neighborsData) {
        const neighbor = this.getOrCreateNode(neighborData);

        if (!this.closedSet.has(neighbor)) {
          const possibleG = this.g(current, neighbor, this);

          if (!this.openList.includes(neighbor))
            this.openList.push(neighbor);
          else if (possibleG >= neighbor.g)
          // eslint-disable-next-line no-continue
            continue;

          neighbor.g = possibleG;
          neighbor.h = this.h(neighborData, this.endData, this);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }

    // no solution by default
    return [];
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function defaultCalcG<N extends AStarNode>(from: N, to: N) {
  return from.g + 1;
}

export {
  Params as AStarParams,
};
