export default class AStarNode {
  f: number; // total cost function

  g: number; // cost function from start to the current grid point

  h: number; // heuristic estimated cost function from current grid point to the goal

  parent: this | undefined; // immediate source of the current grid point

  constructor() {
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.parent = undefined;
  }

  toString() {
    return `{f: ${ this.f }, g: ${ this.g }, h: ${ this.h }}`;
  }
}