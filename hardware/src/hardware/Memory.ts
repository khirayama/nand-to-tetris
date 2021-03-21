import { Binary, Binary13, Binary15, Word } from './types';
import { dmux4way } from './dmux4way';
import { or } from './or';
import { RAM16K } from './RAM16K';
import { Screen } from './Screen';
import { mux4way16 } from './mux4way16';
import { Register } from './Register';

export class Memory {
  private ram: RAM16K = new RAM16K();

  private screen: Screen = new Screen();

  private keyboard: Register = new Register();

  public write(input: Word, load: Binary, address: Binary15) {
    const [loadram0, loadram1, loadscreen, loadkb] = dmux4way(load, [address[0], address[1]]);
    const loadram = or(loadram0, loadram1);
    const ramout = this.ram.write(input, loadram, address);
    const scrout = this.screen.write(input, loadscreen, address.slice(2) as Binary13);
    const kbout = this.keyboard.write(input, loadkb);
    return mux4way16(ramout, ramout, scrout, kbout, [address[0], address[1]]);
  }

  public read(address: Binary15) {
    return mux4way16(
      this.ram.read(address),
      this.ram.read(address),
      this.screen.read(address.slice(2) as Binary13),
      this.keyboard.read(),
      [address[0], address[1]],
    );
  }
}
