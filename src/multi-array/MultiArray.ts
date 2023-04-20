/* eslint-disable max-classes-per-file */
import { VectorN } from "../vector";

export namespace MultiArray {
  export type Initializator<T, D extends number> = (position: VectorN<D>)=> T;

  export class DimensionOverflowError extends Error {
    constructor() {
      super("Array dimension overflow");
    }
  }
  export class DimensionUnderflowError extends Error {
    constructor() {
      super("Array dimension underflow");
    }
  }

  export type Type<T, D extends number> =
  D extends 1 ? T[] :
  D extends 2 ? T[][] :
  D extends 3 ? T[][][] :
  Array<T | Type<T, D>>;

  // eslint-disable-next-line import/prefer-default-export
  export function create<T, D extends number>(initializator: Initializator<T, D>, ...dimensions: VectorN<D>): Type<T, D> {
    return innerCreate<T, D>(initializator, [], dimensions as number[]) as Type<T, D>;
  }

  export function get<T, D extends number>(v: Type<T, D>, ...subindexes: VectorN<D>): T {
    if (subindexes.length === 0) {
      if (!Array.isArray(v))
        return v;

      throw new DimensionUnderflowError();
    }

    if (subindexes.length > 0) {
      if (!Array.isArray(v))
        throw new DimensionOverflowError();
    }

    const index = subindexes[0];
    const subArray = v[index] as Type<T, D>;
    const newSubindexes: VectorN<D> = subindexes.slice(1) as VectorN<D>;

    return get<T, D>(subArray, ...newSubindexes);
  }

  export function set<T, D extends number>(v: Type<T, D>, value: T, ...subindexes: VectorN<D>): void {
    if (subindexes.length > 0) {
      if (!Array.isArray(v))
        throw new DimensionOverflowError();
    }

    if (subindexes.length === 1) {
      if (!Array.isArray(v[0])) {
        // eslint-disable-next-line no-param-reassign
        v[subindexes[0]] = value;

        return;
      }

      throw new DimensionUnderflowError();
    }

    const index = subindexes[0];
    const subArray = v[index] as Type<T, D>;
    const newSubindexes: VectorN<D> = subindexes.slice(1) as VectorN<D>;

    set<T, D>(subArray, value, ...newSubindexes);
  }
}

// eslint-disable-next-line import/prefer-default-export
function innerCreate<T, D extends number>(initializator: MultiArray.Initializator<T, D>, iterator: number[], dimensions: number[]): MultiArray.Type<T, D> | T {
  if (dimensions.length === 0) {
    const content = initializator(iterator as VectorN<D>);

    return content;
  }

  const content: MultiArray.Type<T, D> = new Array(dimensions[0]) as MultiArray.Type<T, D>;

  for (let i = 0; i < dimensions[0]; i++)
    content[i] = innerCreate(initializator, [...iterator, i], dimensions.slice(1));

  return content;
}