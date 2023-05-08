import PcgRandomBigInt from "./PcgRandomBigInt";

/*
El constructor acepta opcionalmente una seed inicial y un valor de incremento,
que pueden ser un números de tipo bigint.

new PcgRandom(seed?: bigint, inc?: bigint)
Genera un PcgRandom con la seed dada y con el valor de incremento dado.
Si no se pasa seed, se genera una aleatoria.
Si no se pasa incremento, se usa el valor por defecto.

el método setSeed(seed: bigint, inc?: bigint) permite cambiar la seed y el incremento,
con los mismos criterios que el constructor.
*/

describe("PcgRandomBigInt", () => {
  it("revert seed", () => {
    const random = new PcgRandomBigInt(BigInt(5000));
    const n = random.integer(40);

    random.setSeed(BigInt(5000)); // revert seed so that we'll get the same sequence.
    expect(n).toBe(random.integer(40));
  } );

  it("equivalente a Math.random", () => {
    const random = new PcgRandomBigInt();

    for (let i = 0; i < 1000; i++) {
      const n = random.number();

      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThan(1);
    }
  } );
} );
