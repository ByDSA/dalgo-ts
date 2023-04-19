import { GridPoint } from "./grid";
import { PathNode } from "./path-finding/a-star";

/* eslint-disable import/prefer-default-export */
export function showPath<D extends number>(path: PathNode<GridPoint<D>>[]) {
  for (let i = 0; i < path.length; i++)
    console.log(...path[i].data.position);
}

export function assertDefined<T>(value: T | undefined): asserts value is T {
  if (value === undefined)
    throw new Error("Value is undefined");
}