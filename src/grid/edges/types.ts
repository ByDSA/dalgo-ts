
export enum Edges2D {
  Right = 0b00000001,
  TopRight = 0b00000010,
  Top = 0b00000100,
  TopLeft = 0b00001000,
  Left = 0b00010000,
  BottomLeft = 0b00100000,
  Bottom = 0b01000000,
  BottomRight = 0b10000000,
}

export type FourEdges2D = Edges2D.Bottom | Edges2D.Left | Edges2D.Right | Edges2D.Top;

export type EightEdges2D = Edges2D.BottomLeft | Edges2D.BottomRight | Edges2D.TopLeft | Edges2D.TopRight | FourEdges2D;

export interface CanMove2DAxis {
  canMoveLeft(): boolean;
  canMoveRight(): boolean;
  canMoveTop(): boolean;
  canMoveBottom(): boolean;
  setCanMoveLeft(canMove: boolean): void;
  setCanMoveRight(canMove: boolean): void;
  setCanMoveTop(canMove: boolean): void;
  setCanMoveBottom(canMove: boolean): void;
}

export interface CanMove2DDiagonal {
  canMoveTopLeft(): boolean;
  canMoveTopRight(): boolean;
  canMoveBottomLeft(): boolean;
  canMoveBottomRight(): boolean;
  setCanMoveTopLeft(canMove: boolean): void;
  setCanMoveTopRight(canMove: boolean): void;
  setCanMoveBottomLeft(canMove: boolean): void;
  setCanMoveBottomRight(canMove: boolean): void;
  allowDiagonals(): void;
}