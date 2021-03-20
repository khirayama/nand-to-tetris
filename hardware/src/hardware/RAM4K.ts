import { Binary, Binary3, Binary8, Binary9, Binary12, Word, Word8, Word512, Word4K } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { RAM512 } from './RAM512';

export class RAM4K {
  private rams: [RAM512, RAM512, RAM512, RAM512, RAM512, RAM512, RAM512, RAM512] = [
    new RAM512(),
    new RAM512(),
    new RAM512(),
    new RAM512(),
    new RAM512(),
    new RAM512(),
    new RAM512(),
    new RAM512(),
  ];

  public write(input: Word, load: Binary, address: Binary12): Word {
    const res: Binary8 = dmux8way(load, address.concat().splice(0, 3) as Binary3);
    const tmp: Word8 = this.rams.map((ram512: RAM512, i: number) => {
      return ram512.write(input, res[i], address.concat().splice(3, 9) as Binary9);
    }) as Word8;
    return mux8way16(...tmp, address.concat().splice(0, 3) as Binary3);
  }

  public read(address: Binary12): Word {
    const addrss: Binary9 = [
      address[3],
      address[4],
      address[5],
      address[6],
      address[7],
      address[8],
      address[9],
      address[10],
      address[11],
    ];
    return mux8way16(
      this.rams[0].read(addrss),
      this.rams[1].read(addrss),
      this.rams[2].read(addrss),
      this.rams[3].read(addrss),
      this.rams[4].read(addrss),
      this.rams[5].read(addrss),
      this.rams[6].read(addrss),
      this.rams[7].read(addrss),
      [address[0], address[1], address[2]],
    );
  }
}
