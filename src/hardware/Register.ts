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

  public write(input: Word, load: Binary): void {
    this.bits[0].write(input[0], load);
    this.bits[1].write(input[1], load);
    this.bits[2].write(input[2], load);
    this.bits[3].write(input[3], load);
    this.bits[4].write(input[4], load);
    this.bits[5].write(input[5], load);
    this.bits[6].write(input[6], load);
    this.bits[7].write(input[7], load);
    this.bits[8].write(input[8], load);
    this.bits[9].write(input[9], load);
    this.bits[10].write(input[10], load);
    this.bits[11].write(input[11], load);
    this.bits[12].write(input[12], load);
    this.bits[13].write(input[13], load);
    this.bits[14].write(input[14], load);
    this.bits[15].write(input[15], load);
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
