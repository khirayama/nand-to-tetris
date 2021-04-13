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

  public write(input: Word, load: Binary, address: Binary15): void {
    const res: Binary8 = dmux8way(load, address.slice(0, 3) as Binary3);
    const addrss = address.slice(3) as Binary12;
    this.rams[0].write(input, res[0], addrss);
    this.rams[1].write(input, res[1], addrss);
    this.rams[2].write(input, res[2], addrss);
    this.rams[3].write(input, res[3], addrss);
    this.rams[4].write(input, res[4], addrss);
    this.rams[5].write(input, res[5], addrss);
    this.rams[6].write(input, res[6], addrss);
    this.rams[7].write(input, res[7], addrss);
  }

  public read(address: Binary15): Word {
    const addrss: Binary12 = [
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
