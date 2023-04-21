/* eslint-disable import/prefer-default-export */
export function assertDefined<T>(value: T | undefined): asserts value is T {
  if (value === undefined)
    throw new Error("Value is undefined");
}