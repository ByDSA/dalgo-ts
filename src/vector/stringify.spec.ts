import { stringify, stringify2 } from "./stringify";

it("vector1", () => {
  const expected = "{1}";
  const actual = stringify([1]);

  expect(actual).toBe(expected);
} );
it("vector2 explicit", () => {
  const expected = "{1,2}";
  const actual = stringify2([1, 2]);

  expect(actual).toBe(expected);
} );
it("vector2 implicit", () => {
  const expected = "{1,2}";
  const actual = stringify([1, 2]);

  expect(actual).toBe(expected);
} );
it("vector3", () => {
  const expected = "{1,2,3}";
  const actual = stringify([1, 2, 3]);

  expect(actual).toBe(expected);
} );
