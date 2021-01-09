import { Binary } from './types';
import { Clock } from './Clock';
import { mux } from './mux';
import { DFF } from './DFF.clock';

export class Bit {
  private dff: DFF = new DFF();

  public write(clock: Clock, input: Binary, load: Binary): void {
    const tmpClock = clock.get() === 0 ? new Clock().next() : new Clock();

    const w1 = mux(this.read(tmpClock), input, load);
    this.dff.write(clock, w1);
  }

  public read(clock: Clock): Binary {
    return this.dff.read(clock);
  }
}
