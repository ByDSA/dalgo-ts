import AStarNode from "./AStarNode";
import BiMap from "./BiMap";

export default class BiMapNodeData<T> {
  private bimap = new BiMap<AStarNode, T>();

  getDataByNode(node: AStarNode): T | undefined {
    return this.bimap.getFromKey(node);
  }

  getNodeByData(data: T): AStarNode | undefined {
    return this.bimap.getFromValue(data);
  }

  setNodeData(node: AStarNode, data: T): void {
    this.bimap.setFromKey(node, data);
  }

  clear(): void {
    this.bimap.clear();
  }
}