import { Bus16, Binary, Binary15, Binary13 } from './types';
import { dmux4way } from './dmux4way';
import { or } from './or';
import { RAM16K } from './RAM16K';
import { Screen } from './Screen';
import { mux4way16 } from './mux4way16';

export class Memory {
  private ram: RAM16K = new RAM16K();

  private screen: Screen = new Screen();

  public write(input: Bus16, load: Binary, address: Binary15) {
    const [loadram0, loadram1, loadscreen] = dmux4way(load, [address[13], address[14]]);
    const loadram = or(loadram0, loadram1);
    const ramout = this.ram.write(input, loadram, address);
    // const scrout = this.screen.write(input, loadscreen, address.slice(0, 14) as Binary13);
    this.screen.write(input, loadscreen, address.slice(0, 14) as Binary13);
    // keyboard
    return mux4way16(
      ramout,
      ramout,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [address[13], address[14]],
    );
  }

  public display() {
    this.screen.display();
  }
}
