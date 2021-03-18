import { Binary, Binary13, Binary15, Binary16 } from './types';
import { dmux4way } from './dmux4way';
import { or } from './or';
import { RAM16K } from './RAM16K';
import { Screen } from './Screen';
import { mux4way16 } from './mux4way16';

export class Memory {
  private ram: RAM16K = new RAM16K();

  private screen: Screen = new Screen();

  public write(input: Binary16, load: Binary, address: Binary15) {
    const [loadram0, loadram1, loadscreen] = dmux4way(load, [address[0], address[1]]);
    const loadram = or(loadram0, loadram1);
    const ramout = this.ram.write(input, loadram, address);
    this.screen.write(input, loadscreen, address.slice(2) as Binary13);
    // TODO Keyboard
    return mux4way16(
      ramout,
      ramout,
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [address[0], address[1]],
    );
  }

  public read(address: Binary15) {
    const tmp = this.ram.read(address);
    return tmp;
  }
}
