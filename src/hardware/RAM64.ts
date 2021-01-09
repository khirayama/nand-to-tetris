import { Binary, Binary3, Binary6, Binary8, Word, Word8, Word64 } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { RAM8 } from './RAM8';

export class RAM64 {
  private registers: [RAM8, RAM8, RAM8, RAM8, RAM8, RAM8, RAM8, RAM8] = [
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
    const tmp: Word8 = this.registers.map((ram8: RAM8, i: number) => {
      return ram8.write(input, res[i], address.concat().splice(3, 3) as Binary3);
    }) as Word8;
    return mux8way16(...tmp, address.concat().splice(0, 3) as Binary3);
  }

  public read(): Word64 {
    const result: Word8[] = [];
    for (const register of this.registers) {
      result.push(register.read());
    }
    return result as Word64;
  }
}
