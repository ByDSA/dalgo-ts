import PcgRandom from "../PcgRandom";
import PcgRandomBigInt from "./PcgRandomBigInt";

if (typeof (BigInt) !== "undefined") {
  it("BigInt seeding", () => {
    const pcg1: any = new PcgRandomBigInt();

    pcg1.setSeed(
      BigInt("0x2210ca8399dc2e37"),
      BigInt("0x14057b7ef767814f"),
    );
    const pcg2: any = new PcgRandom();

    pcg2.setSeed( {
      low: 0x99dc2e37,
      high: 0x2210ca83,
    }, {
      low: 0xf767814f,
      high: 0x14057b7e,
    } );
    const state1 = pcg1.getState();
    const state2 = pcg2.getState();

    // Initial pcg state
    expect(state1.slice(0, 2)).toEqual(state2.slice(0, 2));

    // Initial pcg increment
    expect(state1.slice(2, 4)).toEqual(state2.slice(2, 4));
  } );
}
