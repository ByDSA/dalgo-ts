/* eslint-disable no-bitwise */

import IPcgRandom from "./IPcgRandom";
import Number64, { Number64FullObj, n64ToFullObj } from "./Number64";

// Fuente: https://github.com/thomcc/pcg-random

const defaultMathRandom = Math.random;
// shim for Math.imul.
let { imul } = Math;

if (!imul) {
  imul = (a, b) => {
    const ah = (a >>> 16) & 0xffff;
    const al = a & 0xffff;
    const bh = (b >>> 16) & 0xffff;
    const bl = b & 0xffff;

    return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
  };
}

const MUL_HI = 0x5851f42d;
const MUL_LO = 0x4c957f2d;
let umax: number;
const DEFAULT_INC_LO = 0xf767814f;
const DEFAULT_INC_HI = 0x14057b7e;
const BIT_53 = 9007199254740992.0;
const BIT_27 = 134217728.0;
const MAX_U32 = 0xffffffff;

export function genRandomSeed(): Number64FullObj {
  return {
    low: (defaultMathRandom() * MAX_U32) >>> 0,
    high: (defaultMathRandom() * MAX_U32) >>> 0,
  };
}

export default class PcgRandom implements IPcgRandom<Number64> {
  #state: Uint32Array;

  constructor(initialSeed?: Number64, initialIncr?: Number64) {
    this.#state = new Uint32Array(4);

    if (initialIncr) {
      const initialIncrFullObj = n64ToFullObj(initialIncr);

      if (initialIncrFullObj.low === 0 && initialIncrFullObj.high === 0)
        this.#setDefaultInc();
      else {
        this.#state[2] = initialIncrFullObj.low;
        this.#state[3] = initialIncrFullObj.high;
      }
    } else
      this.#setDefaultInc();

    this.setSeed(initialSeed, initialIncr);
  }

  #setDefaultInc() {
    this.#state[2] = DEFAULT_INC_LO | 1;
    this.#state[3] = DEFAULT_INC_HI;
  }

  #setOnlyInc(inc: Number64) {
    const inc64 = n64ToFullObj(inc);
    // Conceptually, we need to do `(inc << 1) | 1` to match PCG,
    // but this is a bit more of a pain in the ass when not using
    // bigints, since the most significant bit of `incLo` needs to
    // shift into the least significant bit of `incHi` as part of
    // this process.
    const incLoMsb = (inc64.low >>> 31) & 1;
    const incLo0 = ((inc64.low << 1) | 1) >>> 0;
    const incHi0 = (((inc64.high << 1) >>> 0) | incLoMsb) >>> 0;

    this.setStateInc(incLo0, incHi0);
  }

  private setStateInc(low: number, high: number) {
    this.#state[2] = low;
    this.#state[3] = high;
  }

  setSeed(
    seed: Number64 | undefined = undefined,
    inc: Number64 | undefined = undefined,
  ) {
    let seed64: Number64FullObj;

    if (seed === undefined)
      seed64 = genRandomSeed();
    else
      seed64 = n64ToFullObj(seed);

    // Custom `inc`.
    if (inc)
      this.#setOnlyInc(inc);

    return this.setSeedInnerProcess(seed64.low, seed64.high);
  }

  private setStateSeed(low: number, high: number): PcgRandom {
    this.#state[0] = low;
    this.#state[1] = high;

    return this;
  }

  private setSeedInnerProcess(sl32: number, sh32: number): PcgRandom {
    this.setStateSeed(0, 0);
    this.next32();
    this.#add64(this.#state[0], this.#state[1], sl32 >>> 0, sh32 >>> 0);
    this.next32();

    return this;
  }

  private getState(): number[] {
    return [
      this.#state[0], this.#state[1], this.#state[2], this.#state[3],
    ];
  }

  private getSeed(): Number64FullObj {
    const [low, high] = this.getState();

    return {
      low,
      high,
    };
  }

  private setState(stateArray: Uint32Array) {
    if (!(stateArray !== null && stateArray.length === 4))
      throw new TypeError("Expected array of four numbers");

    this.setStateSeed(stateArray[0], stateArray[1]);
    this.setStateInc(stateArray[2], stateArray[3]);
  }

  // Generate a random 32 bit integer between [0, 0xffff_ffff], inclusive.
  next32(): number {
    const state = this.#state;
    // save current state (what we'll use for this number)
    const oldLo = state[0] >>> 0;
    const oldHi = state[1] >>> 0;

    // churn LCG.
    this.#mul64(oldLo, oldHi, MUL_LO, MUL_HI);
    this.#add64(state[0], state[1], state[2], state[3]);

    // get least sig. 32 bits of ((oldstate >> 18) ^ oldstate) >> 27
    let xsHi = oldHi >>> 18;
    let xsLo = ((oldLo >>> 18) | (oldHi << 14)) >>> 0;

    xsHi = (xsHi ^ oldHi) >>> 0;
    xsLo = (xsLo ^ oldLo) >>> 0;
    const xorshifted = ((xsLo >>> 27) | (xsHi << 5)) >>> 0;
    // rotate xorshifted right a random amount, based on the most sig. 5 bits
    // bits of the old state.
    const rot = oldHi >>> 27;
    const rot2 = ((-rot >>> 0) & 31) >>> 0;

    return ((xorshifted >>> rot) | (xorshifted << rot2)) >>> 0;
  }

  integer(max?: number) {
    if (!max)
      return this.next32();

    umax >>>= 0;

    if ((umax & (umax - 1)) === 0) {
      // fast path for power of 2.
      return this.next32() & (umax - 1);
    }

    let num = 0;
    const skew = ((-umax >>> 0) % umax) >>> 0;

    for (num = this.next32(); num < skew; num = this.next32()) {
      // this loop will rarely execute more than twice,
      // and is intentionally empty
    }

    return num % max;
  }

  // Get a uniformly distributed IEEE-754 binary64 between 0.0 and 1.0.
  // This is essentially equivalent to Math.random()
  number(): number {
    const hi = (this.next32() & 0x03ffffff) * 1.0;
    const lo = (this.next32() & 0x07ffffff) * 1.0;

    return ((hi * BIT_27) + lo) / BIT_53;
  }

  // add two 64 bit numbers (given in parts), and store the result in `out`.
  // eslint-disable-next-line no-underscore-dangle
  #add64(aLo: number, aHi: number, bLo: number, bHi: number) {
    const aL = aLo >>> 0;
    const aH = aHi >>> 0;
    const bL = bLo >>> 0;
    const bH = bHi >>> 0;
    const aHpbH = (aH + bH) >>> 0;
    const lo = (aL + bL) >>> 0;
    const carry = Number(lo < aL) >>> 0;
    const hi = (aHpbH + carry) >>> 0;

    this.#state[0] = lo;
    this.#state[1] = hi;
  }

  // multiply two 64 bit numbers (given in parts), and store the result in
  // `out`.
  // eslint-disable-next-line no-underscore-dangle
  #mul64(aLo: number, aHi: number, bLo: number, bHi: number) {
    const aL = aLo >>> 0;
    const aH = aHi >>> 0;
    const bL = bLo >>> 0;
    const bH = bHi >>> 0;
    const aLH = (aL >>> 16) & 0xffff;
    const aLL = aL & 0xffff;
    const bLH = (bL >>> 16) & 0xffff;
    const bLL = bL & 0xffff;
    // no need for imul, these are 16 bits so it can't overflow
    const aLHxbLL = (aLH * bLL) >>> 0;
    const aLLxbLH = (aLL * bLH) >>> 0;
    const aLHxbLH = (aLH * bLH) >>> 0;
    const aLLxbLL = (aLL * bLL) >>> 0;
    const aLHxbLL0 = aLHxbLL >>> 16;
    const aLHxbLL1 = (aLHxbLL << 16) >>> 0;
    const aLLxbLH0 = aLLxbLH >>> 16;
    const aLLxbLH1 = (aLLxbLH << 16) >>> 0;
    const l0 = (aLHxbLL1 + aLLxbLH1) >>> 0;
    const c0 = Number((l0 >>> 0) < (aLHxbLL1 >>> 0)) | 0;
    const h0 = (((aLHxbLL0 + aLLxbLH0) >>> 0) + c0) >>> 0;
    const aLxbH = imul(aL, bH) >>> 0;
    const aHxbL = imul(aH, bL) >>> 0;
    const resLo = (l0 + aLLxbLL) >>> 0;
    const c1 = Number((resLo >>> 0) < (aLLxbLL >>> 0)) | 0;
    const h1 = (((aLHxbLH + h0) >>> 0) + c1) >>> 0;
    const resHi = (((aLxbH + aHxbL) >>> 0) + h1) >>> 0;

    this.#state[0] = resLo;
    this.#state[1] = resHi;
  }
}
