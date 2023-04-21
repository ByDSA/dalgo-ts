import AStarNode from "./AStarNode";

it("to string", () => {
  const actual = new AStarNode();

  actual.f = 3;
  actual.g = 2;
  actual.h = 1;

  expect(actual.toString().includes(actual.f.toString())).toBeTruthy();
  expect(actual.toString().includes(actual.g.toString())).toBeTruthy();
  expect(actual.toString().includes(actual.h.toString())).toBeTruthy();
} );
