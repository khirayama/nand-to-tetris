import { Binary, Bus8, Bus16 } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { RAM8 } from './RAM8';

type Bus16x8 = [Bus16, Bus16, Bus16, Bus16, Bus16, Bus16, Bus16, Bus16];

type Binary3 = [Binary, Binary, Binary];

export class RAM64 {
  private registers: [RAM8, RAM8, RAM8, RAM8, RAM8, RAM8, RAM8, RAM8] = [
    new RAM8(),
    new RAM8(),
    new RAM8(),
    new RAM8(),
    new RAM8(),
    new RAM8(),
    new RAM8(),
    new RAM8(),
  ];

  public write(input: Bus16, load: Binary, address: [Binary, Binary, Binary, Binary, Binary, Binary]): Bus16 {
    const res: Bus8 = dmux8way(load, address.concat().splice(0, 3) as Binary3);
    const tmp: Bus16x8 = this.registers.map((ram8: RAM8, i: number) => {
      return ram8.write(input, res[i], address.concat().splice(3, 3) as Binary3);
    }) as Bus16x8;
    return mux8way16(...tmp, address.concat().splice(0, 3) as Binary3);
  }
}
