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

  public write(input: Word, load: Binary, address: Binary12): void {
    const res: Binary8 = dmux8way(load, address.slice(0, 3) as Binary3);
    const addrss = address.slice(3) as Binary9;
    this.rams[0].write(input, res[0], addrss);
    this.rams[1].write(input, res[1], addrss);
    this.rams[2].write(input, res[2], addrss);
    this.rams[3].write(input, res[3], addrss);
    this.rams[4].write(input, res[4], addrss);
    this.rams[5].write(input, res[5], addrss);
    this.rams[6].write(input, res[6], addrss);
    this.rams[7].write(input, res[7], addrss);
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
