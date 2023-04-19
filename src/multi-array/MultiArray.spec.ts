import { Vector1, Vector2, Vector3 } from "../vector";
import { MultiArray } from "./MultiArray";

describe("MultidimensionalArray", () => {
  let dim1: MultiArray.Type<number, 1>;
  let dim2: MultiArray.Type<number, 2>;
  let dim3: MultiArray.Type<number, 3>;

  describe("create", () => {
    it("dim = 3", () => {
      const expected = [0,1,2];
      const initializator: MultiArray.Initializator<number, 1> = (p: Vector1) => p.reduce((acc, curr)=>acc + curr, 0);

      dim1 = MultiArray.create(initializator, 3);

      expect(dim1).toEqual(expected);
    } );
    it("dim = 2,3", () => {
      const expected = [
        [0, 1, 2],
        [1, 2, 3],
      ];
      const initializator = (p: Vector2) => p.reduce((acc, curr)=>acc + curr, 0);

      dim2 = MultiArray.create(initializator, 2, 3);

      expect(dim2).toEqual(expected);
    } );

    it("dim = 2,3,2", () => {
      const expected = [
        [[0, 1], [1, 2], [2, 3]],
        [[1, 2], [2, 3], [3, 4]],
      ];
      const initializator = (p: Vector3) => p.reduce((acc, curr)=>acc + curr, 0);

      dim3 = MultiArray.create(initializator, 2, 3, 2);

      expect(dim3).toEqual(expected);
    } );
  } );

  describe("get", () => {
    it("dim1", () => {
      const expected = 2;
      const actual = MultiArray.get(dim1, 2);

      expect(actual).toBe(expected);
    } );

    it("dim2", () => {
      const expected = 3;
      const actual = MultiArray.get<number,2>(dim2, 1, 2);

      expect(actual).toBe(expected);
    } );

    it("dim3", () => {
      const expected = 4;
      const actual = MultiArray.get<number,3>(dim3, 1, 2, 1);

      expect(actual).toBe(expected);
    } );
  } );
  describe("set", () => {
    it("dim1", () => {
      const expected = 3;

      MultiArray.set(dim1, expected, 2);
      const actual = MultiArray.get(dim1, 2);

      expect(actual).toBe(expected);
    } );

    it("dim2", () => {
      const expected = 30;

      MultiArray.set<number,2>(dim2, expected, 1, 2);
      const actual = MultiArray.get<number,2>(dim2, 1, 2);

      expect(actual).toBe(expected);
    } );

    it("dim3", () => {
      const expected = 44;

      MultiArray.set<number,3>(dim3, expected, 1, 2, 1);
      const actual = MultiArray.get<number,3>(dim3, 1, 2, 1);

      expect(actual).toBe(expected);
    } );
  } );
} );