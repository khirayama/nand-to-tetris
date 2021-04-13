import { Binary, Binary16, Binary13, Binary12, Word } from './types';
import { RAM4K } from './RAM4K';
import { dmux } from './dmux';
import { mux16 } from './mux16';

export class Screen {
  private rams: [RAM4K, RAM4K] = [new RAM4K(), new RAM4K()];

  public write(input: Word, load: Binary, address: Binary13): Word {
    const bits = dmux(load, address[0]);
    const addrss = address.slice(1) as Binary12;
    this.rams[0].write(input, bits[0], addrss);
    this.rams[1].write(input, bits[1], addrss);

    return input;
  }

  public read(address: Binary13): Word {
    return mux16(
      this.rams[0].read([
        address[1],
        address[2],
        address[3],
        address[4],
        address[5],
        address[6],
        address[7],
        address[8],
        address[9],
        address[10],
        address[11],
        address[12],
      ]),
      this.rams[1].read([
        address[1],
        address[2],
        address[3],
        address[4],
        address[5],
        address[6],
        address[7],
        address[8],
        address[9],
        address[10],
        address[11],
        address[12],
      ]),
      address[0],
    );
  }
}
