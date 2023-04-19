import { AStar2D } from "..";
import { Grid2DFourEdges } from "../../../grid";
import { expectPath } from "./utils";

describe("grid 4x4 sin obstáculos", () => {
  let grid: Grid2DFourEdges;
  let aStar: AStar2D;

  it("grid", () => {
    grid = new Grid2DFourEdges( {
      size: [4, 4],
    } );

    grid.init();

    expect(grid.size[0]).toBe(4);
    expect(grid.size[1]).toBe(4);
  } );

  it("aStar create", () => {
    const start = grid.get([0,0]);
    const end = grid.get([grid.size[0] - 1, grid.size[1] - 1]);

    aStar = new AStar2D( {
      start,
      end,
      grid,
    } );

    expect(aStar.startData).toBe(start);
    expect(aStar.endData).toBe(end);
  } );

  it("path", () => {
    const got = aStar.search();

    expect(got).toBeDefined();
    expect(got.length).toBe(7);

    expectPath(got, [
      [0,0],
      [1,0],
      [2,0],
      [3,0],
      [3,1],
      [3,2],
      [3,3],
    ]);
  } );
} );

describe("grid 4x4 con flat walls", () => {
  let grid: Grid2DFourEdges;
  let aStar: AStar2D;

  it("grid", () => {
    grid = new Grid2DFourEdges( {
      size: [4, 4],
    } );

    grid.init();

    grid.addTwoWayFlatWallAtRightOf([0, 0]);

    grid.addTwoWayFlatWallAtBottomOf([3, 2]);

    expect(grid.size[0]).toBe(4);
    expect(grid.size[1]).toBe(4);
  } );

  it("aStar create", () => {
    const start = grid.get([0,0]);
    const end = grid.get([grid.size[0] - 1, grid.size[1] - 1]);

    aStar = new AStar2D( {
      start,
      end,
      grid,
    } );

    expect(aStar.startData).toBe(start);
    expect(aStar.endData).toBe(end);
  } );

  it("path", () => {
    const got = aStar.search();

    expect(got).toBeDefined();
    expect(got.length).toBe(7);

    expectPath(got, [
      [0,0],
      [0,1],
      [1,1],
      [2,1],
      [2,2],
      [2,3],
      [3,3],
    ]);
  } );
} );