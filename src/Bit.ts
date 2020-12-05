import { Binary } from './types';
import { mux } from './mux';
import { DFF } from './DFF';

export class Bit {
  public dff: DFF = new DFF();

  public write(input: Binary, load: Binary): Binary {
    const w1 = mux(this.dff.read(), input, load);
    return this.dff.write(w1);
  }

  public read(): Binary {
    return this.dff.read();
  }
}
