import { Binary, Binary3, Binary8, Binary12, Binary15, Word, Word8, Word4K, Word16K } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { RAM4K } from './RAM4K';

export class RAM16K {
  private registers: [RAM4K, RAM4K, RAM4K, RAM4K, RAM4K, RAM4K, RAM4K, RAM4K] = [
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
    const tmp: Word8 = this.registers.map((ram4K: RAM4K, i: number) => {
      return ram4K.write(input, res[i], address.concat().splice(3, 12) as Binary12);
    }) as Word8;
    return mux8way16(...tmp, address.concat().splice(0, 3) as Binary3);
  }

  public read(): Word16K {
    let result: Word4K[] = [];
    for (const register of this.registers) {
      result = result.concat(register.read());
    }
    return result as Word16K;
  }
}
