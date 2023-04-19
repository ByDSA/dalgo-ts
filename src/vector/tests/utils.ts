import { Vector2, VectorN } from "../Vector";

export function expectVector<D extends number>(actual: VectorN<D>, expected: VectorN<D>) {
  if (!actual || !expected)
    throw new Error("position is undefined");

  if (actual[0] !== expected[0] || actual[1] !== expected[1])
    throw new Error(`${vectorStringify(actual)} is not ${vectorStringify(expected)}`);
}

export function vector2Stringify(position: Vector2) {
  return `{${position[0]}, ${position[1]}}`;
}

export function vectorStringify<D extends number>(position: VectorN<D>) {
  if (position.length === 2)
    return vector2Stringify(position as Vector2);

  const listStr = position.reduce((acc, value) => `${acc}, ${value}`, "");

  return `{${listStr}}`;
}