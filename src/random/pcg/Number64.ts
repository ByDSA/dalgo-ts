export type Number64Obj = {
  low: number;
  high?: number;
};

export type Number64FullObj = Required<Number64Obj>;
type Number64 = Number64Obj | number;
export default Number64;

export function n64GetLow(n: Number64): number {
  return typeof n === "number" ? n : n.low ?? 0;
}

export function n64GetHigh(n: Number64): number {
  return typeof n === "number" ? 0 : n.high ?? 0;
}

export function n64ToFullObj(n: Number64): Number64FullObj {
  if (typeof n === "number") {
    return {
      low: n,
      high: 0,
    };
  }

  return {
    low: n.low,
    high: n.high ?? 0,
  };
}
