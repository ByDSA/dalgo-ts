export default class AStarNode {
  f: number;

  g: number;

  h: number;

  parent: this | undefined;

  caption: string | undefined;

  constructor() {
    this.f = 0; // total cost function
    this.g = 0; // cost function from start to the current grid point
    this.h = 0; // heuristic estimated cost function from current grid point to the goal
    this.parent = undefined; // immediate source of the current grid point
  }

  toString() {
    return this.caption ?? `{f: ${ this.f }, g: ${ this.g }, h: ${ this.h }}`;
  }
}