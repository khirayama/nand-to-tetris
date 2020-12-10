import { Binary, Bus16 } from './types';
import { Register } from './Register';
import { inc16 } from './inc16';
import { mux16 } from './mux16';

export class PC {
  private register = new Register();

  public write(input: Bus16, inc: Binary, load: Binary, reset: Binary): Bus16 {
    const fb = this.register.read();
    const w1 = inc16(fb);
    const w2 = mux16(fb, w1, inc);
    const w3 = mux16(w2, input, load);
    const w4 = mux16(w3, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], reset);
    return this.register.write(w4, 1);
  }
}
