import { Binary, Word } from './types';
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

  public write(input: Word, load: Binary): Word {
    const tmp = this.read();
    for (let i = 0; i < this.bits.length; i += 1) {
      const bit: Bit = this.bits[i];
      bit.write(input[i], load);
    }
    return tmp;
  }

  public read(): Word {
    return this.bits.map((bit) => bit.read()) as Word;
  }
}
