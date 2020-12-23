import { Binary, Binary3, Binary8, Word, Word8 } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { Clock } from './Clock';
import { Register } from './Register.clock';

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

  public write(clock: Clock, input: Word, load: Binary, address: Binary3) {
    const res: Binary8 = dmux8way(load, address);
    this.registers.forEach((register: Register, i: number) => {
      register.write(clock, input, res[i]);
    });
  }

  public read(clock: Clock, address: Binary3): Word {
    return mux8way16(...(this.registers.map((register) => register.read(clock)) as Word8), address);
  }
}
