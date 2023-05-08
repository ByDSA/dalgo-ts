/*
El constructor acepta opcionalmente una seed inicial y un valor de incremento,
que pueden ser un números de hasta 64 bits.

new PcgRandom(seed?: Number64, inc?: Number64)
Genera un PcgRandom con la seed dada y con el valor de incremento dado.
Si no se pasa seed, se genera una aleatoria.
Si no se pasa incremento, se usa el valor por defecto.

el método setSeed(seed: Number64, inc?: Number64) permite cambiar la seed y el incremento,
con los mismos criterios que el constructor.
*/

import PcgRandom from "./PcgRandom";

describe("PcgRandom", () => {
  it("revert seed", () => {
    const random = new PcgRandom(5000);
    const n = random.integer(40);

    random.setSeed(5000); // revert seed so that we'll get the same sequence.
    expect(n).toBe(random.integer(40));
  } );

  it("equivalente a Math.random", () => {
    const random = new PcgRandom();

    for (let i = 0; i < 1000; i++) {
      const n = random.number();

      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThan(1);
    }
  } );
} );
