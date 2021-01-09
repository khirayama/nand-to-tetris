import { Binary, Binary3, Binary8, Word, Word8 } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { Register } from './Register';

export class RAM8 {
  private registers: [Register, Register, Register, Register, Register, Register, Register, Register] = [
    new Register(),
    new Register(),
    new Register(),
    new Register(),
    new Register(),
    new Register(),
    new Register(),
    new Register(),
  ];

  public write(input: Word, load: Binary, address: Binary3): Word {
    const res: Binary8 = dmux8way(load, address);
    const tmp: Word8 = this.registers.map((register: Register, i: number) => {
      return register.write(input, res[i]);
    }) as Word8;
    return mux8way16(...tmp, address);
  }

  public read(): Word8 {
    const result: Word[] = [];
    for (const register of this.registers) {
      result.push(register.read());
    }
    return result as Word8;
  }
}
