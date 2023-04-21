type ArrayLengthMutationKeys = "pop" | "push" | "shift" | "splice" | "unshift";
type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> =
  Pick<TObj, Exclude<keyof TObj, ArrayLengthMutationKeys>>
  & {
    readonly length: L;
    [ I: number ]: T;
    [Symbol.iterator]: ()=> IterableIterator<T>;
  };

export type Vector1 = [number];

export type Vector2 = [number, number];

export type Vector3 = [number, number, number];

export type VectorN<D extends number = 1> =
D extends 1 ? Vector1 :
D extends 2 ? Vector2 :
D extends 3 ? Vector3 :
FixedLengthArray<number, D>;
