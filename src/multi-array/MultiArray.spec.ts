import { Vector1, Vector2, Vector3 } from "../vector";
import { MultiArray } from "./MultiArray";

describe("MultidimensionalArray", () => {
  function genSampleDim1() {
    const initializator = (p: Vector1) => p.reduce((acc, curr) => acc + curr, 0);

    return MultiArray.create(initializator, 3);
  }

  function genSampleDim2() {
    const initializator = (p: Vector2) => p.reduce((acc, curr) => acc + curr, 0);

    return MultiArray.create(initializator, 2, 3);
  }

  function genSampleDim3() {
    const initializator = (p: Vector3) => p.reduce((acc, curr) => acc + curr, 0);

    return MultiArray.create(initializator, 2, 3, 2);
  }

  describe("create", () => {
    it("dim = 3", () => {
      const expected = [0, 1, 2];
      const dim1: MultiArray.Type<number, 1> = genSampleDim1();

      expect(dim1).toEqual(expected);
    } );
    it("dim = 2,3", () => {
      const expected = [
        [0, 1, 2],
        [1, 2, 3],
      ];
      const dim2: MultiArray.Type<number, 2> = genSampleDim2();

      expect(dim2).toEqual(expected);
    } );

    it("dim = 2,3,2", () => {
      const expected = [
        [[0, 1], [1, 2], [2, 3]],
        [[1, 2], [2, 3], [3, 4]],
      ];
      const dim3: MultiArray.Type<number, 3> = genSampleDim3();

      expect(dim3).toEqual(expected);
    } );
  } );

  describe("get", () => {
    it("dim1", () => {
      const expected = 2;
      const dim1 = genSampleDim1();
      const actual = MultiArray.get(dim1, 2);

      expect(actual).toBe(expected);
    } );

    it("dim2", () => {
      const expected = 3;
      const dim2 = genSampleDim2();
      const actual = MultiArray.get<number, 2>(dim2, 1, 2);

      expect(actual).toBe(expected);
    } );

    it("dim3", () => {
      const expected = 4;
      const dim3 = genSampleDim3();
      const actual = MultiArray.get<number, 3>(dim3, 1, 2, 1);

      expect(actual).toBe(expected);
    } );
  } );
  describe("set", () => {
    it("dim1", () => {
      const expected = 3;
      const dim1 = genSampleDim1();

      MultiArray.set(dim1, expected, 2);
      const actual = MultiArray.get(dim1, 2);

      expect(actual).toBe(expected);
    } );

    it("dim2", () => {
      const expected = 30;
      const dim2 = genSampleDim2();

      MultiArray.set<number, 2>(dim2, expected, 1, 2);
      const actual = MultiArray.get<number, 2>(dim2, 1, 2);

      expect(actual).toBe(expected);
    } );

    it("dim3", () => {
      const expected = 44;
      const dim3 = genSampleDim3();

      MultiArray.set<number, 3>(dim3, expected, 1, 2, 1);
      const actual = MultiArray.get<number, 3>(dim3, 1, 2, 1);

      expect(actual).toBe(expected);
    } );
  } );

  it("set [0][0] = 1 en un multiarray de una dimensión", () => {
    const dim1 = genSampleDim1();

    expect(() => {
      MultiArray.set(dim1 as any, 1, 0, 0);
    } ).toThrowError(MultiArray.DimensionOverflowError);
  } );
  it("get [3][2] en un multiarray de una dimensión", () => {
    const dim1 = genSampleDim1();

    expect(() => {
      MultiArray.get(dim1 as any, 3, 2);
    } ).toThrowError(MultiArray.DimensionOverflowError);
  } );

  it("get [3] en un multiarray de 2x3 dimensiones", () => {
    const dim2 = genSampleDim2();
    const actual = MultiArray.get(dim2 as any, 3);

    expect(actual).toBeUndefined();
  } );

  it("set [1] en un multiarray de 2x3 dimensiones", () => {
    const dim2 = genSampleDim2();

    expect(() => {
      MultiArray.set(dim2 as any, 0, 1);
    } ).toThrowError(MultiArray.DimensionUnderflowError);
  } );
  it("get [0] en un multiarray de 2x3 dimensiones", () => {
    const dim2 = genSampleDim2();

    expect(() => {
      MultiArray.get(dim2 as any, 0);
    } ).toThrowError(MultiArray.DimensionUnderflowError);
  } );
} );
