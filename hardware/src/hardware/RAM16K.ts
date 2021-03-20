import { Binary, Binary3, Binary8, Binary12, Binary15, Word, Word8, Word4K, Word16K, Binary14 } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { RAM4K } from './RAM4K';

export class RAM16K {
  private rams: [RAM4K, RAM4K, RAM4K, RAM4K, RAM4K, RAM4K, RAM4K, RAM4K] = [
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
  ];

  public write(input: Word, load: Binary, address: Binary15): Word {
    const res: Binary8 = dmux8way(load, address.concat().splice(0, 3) as Binary3);
    const tmp: Word8 = this.rams.map((ram4K: RAM4K, i: number) => {
      return ram4K.write(input, res[i], address.concat().splice(3, 12) as Binary12);
    }) as Word8;
    return mux8way16(...tmp, address.concat().splice(0, 3) as Binary3);
  }

  public read(address: Binary15): Word {
    return mux8way16(
      ...(this.rams.map((ram) =>
        ram.read([
          address[3],
          address[4],
          address[5],
          address[6],
          address[7],
          address[8],
          address[9],
          address[10],
          address[11],
          address[12],
          address[13],
          address[14],
        ]),
      ) as Word8),
      [address[0], address[1], address[2]],
    );
  }
}
