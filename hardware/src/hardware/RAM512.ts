import { Binary, Binary3, Binary6, Binary8, Binary9, Word, Word8, Word64, Word512 } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { RAM64 } from './RAM64';

export class RAM512 {
  private rams: [RAM64, RAM64, RAM64, RAM64, RAM64, RAM64, RAM64, RAM64] = [
    new RAM64(),
    new RAM64(),
    new RAM64(),
    new RAM64(),
    new RAM64(),
    new RAM64(),
    new RAM64(),
    new RAM64(),
  ];

  public write(input: Word, load: Binary, address: Binary9): Word {
    const res: Binary8 = dmux8way(load, address.concat().splice(0, 3) as Binary3);
    const tmp: Word8 = this.rams.map((ram64: RAM64, i: number) => {
      return ram64.write(input, res[i], address.concat().splice(3, 6) as Binary6);
    }) as Word8;
    return mux8way16(...tmp, address.concat().splice(0, 3) as Binary3);
  }

  public read(address: Binary9): Word {
    return mux8way16(
      ...(this.rams.map((ram) =>
        ram.read([address[3], address[4], address[5], address[6], address[7], address[8]]),
      ) as Word8),
      [address[0], address[1], address[2]],
    );
  }
}
