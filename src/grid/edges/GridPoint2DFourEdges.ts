/* eslint-disable no-bitwise */
import { Vector2 } from "../../vector";
import GridPoint from "../GridPoint";
import { CanMove2DAxis, Edges2D } from "./types";

export default class GridPoint2DFourEdges
  extends GridPoint<2>
  implements CanMove2DAxis {
  protected _canMoveByte: number;

  canMoveLeft(): boolean {
    return (this._canMoveByte & Edges2D.Left) !== 0;
  }

  canMoveTop(): boolean {
    return (this._canMoveByte & Edges2D.Top) !== 0;
  }

  canMoveRight(): boolean {
    return (this._canMoveByte & Edges2D.Right) !== 0;
  }

  canMoveBottom(): boolean {
    return (this._canMoveByte & Edges2D.Bottom) !== 0;
  }

  setCanMoveLeft(canMove: boolean) {
    this._canMoveByte = canMove
      ? this._canMoveByte | Edges2D.Left
      : this._canMoveByte & ~Edges2D.Left;
  }

  setCanMoveTop(canMove: boolean) {
    this._canMoveByte = canMove
      ? this._canMoveByte | Edges2D.Top
      : this._canMoveByte & ~Edges2D.Top;
  }

  setCanMoveRight(canMove: boolean) {
    this._canMoveByte = canMove
      ? this._canMoveByte | Edges2D.Right
      : this._canMoveByte & ~Edges2D.Right;
  }

  setCanMoveBottom(canMove: boolean) {
    this._canMoveByte = canMove
      ? this._canMoveByte | Edges2D.Bottom
      : this._canMoveByte & ~Edges2D.Bottom;
  }

  constructor(position: Vector2) {
    super(position);

    this._canMoveByte = Edges2D.Left | Edges2D.Right | Edges2D.Top | Edges2D.Bottom;
  }
}
