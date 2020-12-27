import { Binary, Binary12, Binary13, Word } from './types';
import { Clock } from './Clock';
import { RAM4K } from './RAM4K.clock';
import { dmux } from './dmux';
import { mux } from './mux';

export class Screen {
  private rams: [RAM4K, RAM4K] = [new RAM4K(), new RAM4K()];

  public write(clock: Clock, input: Word, address: Binary13, load: Binary) {
    const bits = dmux(load, address[0]);
    this.rams[0].write(clock, input, bits[0], address.slice(1) as Binary12);
    this.rams[1].write(clock, input, bits[1], address.slice(1) as Binary12);
    // TODO draw
  }

  public read(clock: Clock, address: Binary13): Word {
    const output1 = this.rams[0].read(clock, address.slice(1) as Binary12);
    const output2 = this.rams[1].read(clock, address.slice(1) as Binary12);

    return [
      mux(output1[0], output2[0], address[0]),
      mux(output1[1], output2[1], address[0]),
      mux(output1[2], output2[2], address[0]),
      mux(output1[3], output2[3], address[0]),
      mux(output1[4], output2[4], address[0]),
      mux(output1[5], output2[5], address[0]),
      mux(output1[6], output2[6], address[0]),
      mux(output1[7], output2[7], address[0]),
      mux(output1[8], output2[8], address[0]),
      mux(output1[9], output2[9], address[0]),
      mux(output1[10], output2[10], address[0]),
      mux(output1[11], output2[11], address[0]),
      mux(output1[12], output2[12], address[0]),
      mux(output1[13], output2[13], address[0]),
      mux(output1[14], output2[14], address[0]),
      mux(output1[15], output2[15], address[0]),
    ];
  }
}
