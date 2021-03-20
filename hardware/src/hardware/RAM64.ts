import { Binary, Binary3, Binary6, Binary8, Word, Word8, Word64 } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { RAM8 } from './RAM8';

export class RAM64 {
  private rams: [RAM8, RAM8, RAM8, RAM8, RAM8, RAM8, RAM8, RAM8] = [
    new RAM8(),
    new RAM8(),
    new RAM8(),
    new RAM8(),
    new RAM8(),
    new RAM8(),
    new RAM8(),
    new RAM8(),
  ];

  public write(input: Word, load: Binary, address: Binary6): Word {
    const res: Binary8 = dmux8way(load, address.concat().splice(0, 3) as Binary3);
    const tmp: Word8 = this.rams.map((ram8: RAM8, i: number) => {
      return ram8.write(input, res[i], address.concat().splice(3, 3) as Binary3);
    }) as Word8;
    return mux8way16(...tmp, address.concat().splice(0, 3) as Binary3);
  }

  public read(address: Binary6): Word {
    const addrss: Binary3 = [address[3], address[4], address[5]];
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
