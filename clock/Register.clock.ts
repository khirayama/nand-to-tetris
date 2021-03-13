import { Binary, Word } from './types';
import { Clock } from './Clock';
import { Bit } from './Bit.clock';

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

  public write(clock: Clock, input: Word, load: Binary): void {
    for (let i = 0; i < this.bits.length; i += 1) {
      const bit: Bit = this.bits[i];
      bit.write(clock, input[i], load);
    }
  }

  public read(clock: Clock): Word {
    return this.bits.map((bit) => bit.read(clock)) as Word;
  }
}
