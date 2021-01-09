import { Binary, Binary3, Binary8, Binary9, Binary12, Word, Word8, Word512, Word4K } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { RAM512 } from './RAM512';

export class RAM4K {
  private registers: [RAM512, RAM512, RAM512, RAM512, RAM512, RAM512, RAM512, RAM512] = [
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
    const tmp: Word8 = this.registers.map((ram512: RAM512, i: number) => {
      return ram512.write(input, res[i], address.concat().splice(3, 9) as Binary9);
    }) as Word8;
    return mux8way16(...tmp, address.concat().splice(0, 3) as Binary3);
  }

  public read(): Word4K {
    const result: Word512[] = [];
    for (const register of this.registers) {
      result.push(register.read());
    }
    return result as Word4K;
  }
}
