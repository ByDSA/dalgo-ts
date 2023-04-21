/* eslint-disable no-bitwise */
import { Vector2 } from "../../vector";
import GridPoint2DFourEdges from "./GridPoint2DFourEdges";
import { CanMove2DDiagonal, Edges2D } from "./types";

export default class GridPoint2DEightEdges
  extends GridPoint2DFourEdges
  implements CanMove2DDiagonal {
  canMoveTopLeft(): boolean {
    return (this._canMoveByte & Edges2D.TopLeft) !== 0;
  }

  canMoveBottomLeft(): boolean {
    return (this._canMoveByte & Edges2D.BottomLeft) !== 0;
  }

  canMoveTopRight(): boolean {
    return (this._canMoveByte & Edges2D.TopRight) !== 0;
  }

  canMoveBottomRight(): boolean {
    return (this._canMoveByte & Edges2D.BottomRight) !== 0;
  }

  setCanMoveTopLeft(canMove: boolean) {
    this._canMoveByte = canMove
      ? this._canMoveByte | Edges2D.TopLeft
      : this._canMoveByte & ~Edges2D.TopLeft;
  }

  setCanMoveTopRight(canMove: boolean) {
    this._canMoveByte = canMove
      ? this._canMoveByte | Edges2D.TopRight
      : this._canMoveByte & ~Edges2D.TopRight;
  }

  setCanMoveBottomLeft(canMove: boolean) {
    this._canMoveByte = canMove
      ? this._canMoveByte | Edges2D.BottomLeft
      : this._canMoveByte & ~Edges2D.BottomLeft;
  }

  setCanMoveBottomRight(canMove: boolean) {
    this._canMoveByte = canMove
      ? this._canMoveByte | Edges2D.BottomRight
      : this._canMoveByte & ~Edges2D.BottomRight;
  }

  allowDiagonals() {
    this._canMoveByte
      |= Edges2D.TopLeft
      | Edges2D.TopRight
      | Edges2D.BottomLeft
      | Edges2D.BottomRight;
  }

  constructor(position: Vector2) {
    super(position);
  }
}
