import { Binary, Bus8, Bus16 } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { Register } from './Register';

type Bus16x8 = [Bus16, Bus16, Bus16, Bus16, Bus16, Bus16, Bus16, Bus16];

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

  public write(input: Bus16, load: Binary, address: [Binary, Binary, Binary]): Bus16 {
    const res: Bus8 = dmux8way(load, address);
    const tmp: Bus16x8 = this.registers.map((register: Register, i: number) => {
      return register.write(input, res[i]);
    }) as Bus16x8;
    return mux8way16(...tmp, address);
  }
}
