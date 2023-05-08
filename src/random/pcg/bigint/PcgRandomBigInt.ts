/* eslint-disable no-bitwise */

import IPcgRandom from "../IPcgRandom";
import { Number64FullObj } from "../Number64";
import PcgRandom from "../PcgRandom";

const MAX_U32 = 0xffffffff;
const bU32Max = BigInt(MAX_U32);
const b32 = BigInt(32);

export default class PcgRandomBigInt implements IPcgRandom<bigint> {
  #pcgRandom: PcgRandom;

  constructor(initialSeed?: bigint, initialIncr?: bigint) {
    this.#pcgRandom = new PcgRandom();

    this.setSeed(initialSeed ?? BigInt(0), initialIncr);
  }

  #setOnlySeed(seed: bigint) {
    const n64 = bigIntToN64(seed);

    (this.#pcgRandom as any).setStateSeed(n64.low, n64.high);
  }

  #setOnlyInc(inc: bigint) {
    // We need to do `(inc << 1) | 1` to match PCG.
    const b1 = BigInt(1);
    const fixinc = (inc << b1) | b1;
    const n64 = bigIntToN64(fixinc);

    (this.#pcgRandom as any).setStateInc(n64.low, n64.high);
  }

  setSeed(seed?: bigint, inc?: bigint): PcgRandom {
    if (seed)
      this.#setOnlySeed(seed);
    else
      this.#setRandomSeed();

    if (inc !== undefined)
      this.#setOnlyInc(inc);

    const [low, high] = (this.#pcgRandom as any).getState();

    return (this.#pcgRandom as any).setSeedInnerProcess(low, high);
  }

  private getState() {
    return (this.#pcgRandom as any).getState();
  }

  #setRandomSeed() {
    this.#pcgRandom.setSeed();
  }

  private setState(state: Uint32Array) {
    (this.#pcgRandom as any).setState(state);
  }

  // Generate a random 32 bit integer between [0, 0xffff_ffff], inclusive.
  next32(): number {
    return this.#pcgRandom.next32();
  }

  integer(max?: number) {
    return this.#pcgRandom.integer(max);
  }

  // Get a uniformly distributed IEEE-754 binary64 between 0.0 and 1.0.
  // This is essentially equivalent to Math.random()
  number(): number {
    return this.#pcgRandom.number();
  }
}

function bigIntToN64(n: bigint): Number64FullObj {
  const sl32 = Number(n & bU32Max);
  const sh32 = Number((n >> b32) & bU32Max);

  return {
    low: sl32,
    high: sh32,
  };
}
