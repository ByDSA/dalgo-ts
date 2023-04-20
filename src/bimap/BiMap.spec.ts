import BiMap from "./BiMap";

it("create", () => {
  const bimap = new BiMap();

  expect(bimap).toBeInstanceOf(BiMap);
} );

it("set and get", () => {
  const biMap = new BiMap();

  biMap.set(1, 2);
  biMap.set(3, 4);

  expect(biMap.get(1)).toBe(2);
  expect(biMap.get(2)).toBeUndefined();
  expect(biMap.get(3)).toBe(4);
  expect(biMap.get(4)).toBeUndefined();
} );

it("set and get from keys", () => {
  const biMap = new BiMap();

  biMap.setFromKey(1, 2);
  biMap.setFromKey(3, 4);

  expect(biMap.getFromKey(1)).toBe(2);
  expect(biMap.getFromKey(2)).toBeUndefined();
  expect(biMap.getFromKey(3)).toBe(4);
  expect(biMap.getFromKey(4)).toBeUndefined();
} );

it("set from key and get from value", () => {
  const biMap = new BiMap();

  biMap.setFromKey(1, 2);
  biMap.setFromKey(3, 4);

  expect(biMap.getFromValue(2)).toBe(1);
  expect(biMap.getFromValue(1)).toBeUndefined();
  expect(biMap.getFromValue(4)).toBe(3);
  expect(biMap.getFromValue(3)).toBeUndefined();
} );

it("set from value and get from key", () => {
  const biMap = new BiMap();

  biMap.setFromValue(2, 1);
  biMap.setFromValue(4, 3);

  expect(biMap.getFromKey(1)).toBe(2);
  expect(biMap.getFromKey(2)).toBeUndefined();
  expect(biMap.getFromKey(3)).toBe(4);
  expect(biMap.getFromKey(4)).toBeUndefined();
} );

it("has key", () => {
  const biMap = new BiMap();

  biMap.set(1, 2);
  biMap.setFromKey(3, 4);
  biMap.setFromValue(6, 5);

  expect(biMap.hasKey(1)).toBe(true);
  expect(biMap.hasKey(2)).toBe(false);
  expect(biMap.hasKey(3)).toBe(true);
  expect(biMap.hasKey(4)).toBe(false);
  expect(biMap.hasKey(5)).toBe(true);
  expect(biMap.hasKey(6)).toBe(false);
} );

it("has value", () => {
  const biMap = new BiMap();

  biMap.set(1, 2);
  biMap.setFromKey(3, 4);
  biMap.setFromValue(6, 5);

  expect(biMap.hasValue(1)).toBe(false);
  expect(biMap.hasValue(2)).toBe(true);
  expect(biMap.hasValue(3)).toBe(false);
  expect(biMap.hasValue(4)).toBe(true);
  expect(biMap.hasValue(5)).toBe(false);
  expect(biMap.hasValue(6)).toBe(true);
} );

it("remove by key", () => {
  const biMap = new BiMap();

  biMap.set(1, 2);

  expect(biMap.get(1)).toBeDefined();
  biMap.removeByKey(1);

  expect(biMap.get(1)).toBeUndefined();
} );

it("remove by key which doesn't exists", () => {
  const biMap = new BiMap();

  biMap.set(1, 2);

  expect(biMap.get(2)).toBeUndefined();
  biMap.removeByKey(2);
  expect(biMap.get(1)).toBeDefined();
} );

it("remove by value", () => {
  const biMap = new BiMap();

  biMap.set(1, 2);

  expect(biMap.getFromValue(2)).toBeDefined();
  biMap.removeByValue(2);

  expect(biMap.getFromValue(2)).toBeUndefined();
} );

it("remove by value which doesn't exists", () => {
  const biMap = new BiMap();

  biMap.set(1, 2);

  expect(biMap.getFromValue(1)).toBeUndefined();
  biMap.removeByValue(1);
  expect(biMap.getFromValue(2)).toBeDefined();
} );