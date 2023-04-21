import { Vector3 } from "../Vector";
import { expectVector } from "./expects";

it("normal", () => {
  const expected: Vector3 = [1,2,3];
  const actual = expected;

  expectVector(actual, expected);
} );

it("undefined actual", () => {
  const expected: Vector3 = [1,2,3];
  const actual = undefined as any;

  expect(()=>
    expectVector(actual, expected)).toThrow();
} );

it("undefined expected", () => {
  const expected = undefined as any;
  const actual: Vector3 = [1,2,3];

  expect(()=>
    expectVector(actual, expected)).toThrow();
} );

it("unexpected", () => {
  const unexpected: Vector3 = [1,2,4];
  const actual: Vector3 = [1,2,3];

  expect(()=>
    expectVector(actual, unexpected)).toThrow();
} );