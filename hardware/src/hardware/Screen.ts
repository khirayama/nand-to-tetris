import { Binary, Bus16, Binary13, Binary12 } from './types';
import { RAM4K } from './RAM4K';
import { dmux } from './dmux';

export class Screen {
  private rams: [RAM4K, RAM4K] = [new RAM4K(), new RAM4K()];

  public write(input: Bus16, load: Binary, address: Binary13) {
    const bits = dmux(load, address[0]);
    const addrss = address.slice(1, 13) as Binary12;
    this.rams[0].write(input, bits[0], addrss);
    this.rams[1].write(input, bits[1], addrss);
  }

  public display() {
    // 512 * 256 = 131072
    const pixels = this.rams[0].read().concat(this.rams[1].read());
    let screen = '';
    for (let i = 0; i < pixels.length; i += 1) {
      if (i !== 0 && i % 512 === 0) {
        // screen += '\n';
      }
      const pixel = pixels[i];
      screen += pixel ? 'X' : '';
    }
    console.log(screen);
    console.log(pixels.length);
  }
}