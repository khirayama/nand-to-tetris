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
    return [
      this.bits[0].read(),
      this.bits[1].read(),
      this.bits[2].read(),
      this.bits[3].read(),
      this.bits[4].read(),
      this.bits[5].read(),
      this.bits[6].read(),
      this.bits[7].read(),
      this.bits[8].read(),
      this.bits[9].read(),
      this.bits[10].read(),
      this.bits[11].read(),
      this.bits[12].read(),
      this.bits[13].read(),
      this.bits[14].read(),
      this.bits[15].read(),
    ];
  }
}
