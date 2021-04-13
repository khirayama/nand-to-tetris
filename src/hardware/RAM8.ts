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

  public write(input: Word, load: Binary, address: Binary3): void {
    const res: Binary8 = dmux8way(load, address);
    this.registers[0].write(input, res[0]);
    this.registers[1].write(input, res[1]);
    this.registers[2].write(input, res[2]);
    this.registers[3].write(input, res[3]);
    this.registers[4].write(input, res[4]);
    this.registers[5].write(input, res[5]);
    this.registers[6].write(input, res[6]);
    this.registers[7].write(input, res[7]);
  }

  public read(address: Binary3): Word {
    return mux8way16(
      this.registers[0].read(),
      this.registers[1].read(),
      this.registers[2].read(),
      this.registers[3].read(),
      this.registers[4].read(),
      this.registers[5].read(),
      this.registers[6].read(),
      this.registers[7].read(),
      address,
    );
  }
}
