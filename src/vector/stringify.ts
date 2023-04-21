import { Vector2, VectorN } from "./Vector";

export function stringify2(position: Vector2) {
  return `{${position[0]},${position[1]}}`;
}

export function stringify<D extends number>(position: VectorN<D>) {
  if (position.length === 2)
    return stringify2(position as Vector2);

  const listStr = position.reduce((acc, value, i) => {
    if (i === 0)
      return value.toString();

    return `${acc},${value}`;
  }, "");

  return `{${listStr}}`;
}
