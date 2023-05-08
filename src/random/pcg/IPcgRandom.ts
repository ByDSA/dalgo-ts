export default interface IPcgRandom<T> {
  setSeed(seed?: T, inc?: T): ThisType<T>;

  // Generate a random 32 bit integer between [0, 0xffff_ffff], inclusive.
  next32(): number;

  integer(max?: number): number;

  // Get a uniformly distributed IEEE-754 binary64 between 0.0 and 1.0.
  // This is essentially equivalent to Math.random()
  number(): number;
}
