import { Binary, Bus16 } from './types';
import { Bit } from './Bit';

export class Register {
  public bits: [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit] = [
    new Bit(),
    new Bit(),
    new Bit(),
    new Bit(),
    new Bit(),
    new Bit(),
    new Bit(),
    new Bit(),
    new Bit(),
    new Bit(),
    new Bit(),
    new Bit(),
    new Bit(),
    new Bit(),
    new Bit(),
    new Bit(),
  ];

  public write(input: Bus16, load: Binary): Bus16 {
    for (let i = 0; i < this.bits.length; i += 1) {
      const bit: Bit = this.bits[i];
      bit.write(input[i], load);
    }
    return this.read();
  }

  public read(): Bus16 {
    return this.bits.map((bit) => bit.read()) as Bus16;
  }
}
