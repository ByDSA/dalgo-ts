import { assertDefined } from "./asserts";

it("assertDefined", () => {
  const actual: number | undefined = 4;

  expect(actual * 2).toBeTruthy();
  assertDefined(actual);
} );

it("assertDefined", () => {
  let actual: number | undefined;

  expect(() => assertDefined(actual)).toThrow();
} );
