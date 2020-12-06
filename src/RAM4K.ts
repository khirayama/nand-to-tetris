import { Binary, Bus8, Bus16 } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { RAM512 } from './RAM512';

type Bus16x8 = [Bus16, Bus16, Bus16, Bus16, Bus16, Bus16, Bus16, Bus16];

type Binary3 = [Binary, Binary, Binary];

type Binary6 = [...Binary3, ...Binary3];

type Binary9 = [...Binary3, ...Binary3, ...Binary3];

type Binary12 = [...Binary6, ...Binary6];

export class RAM4K {
  private registers: [RAM512, RAM512, RAM512, RAM512, RAM512, RAM512, RAM512, RAM512] = [
    new RAM512(),
    new RAM512(),
    new RAM512(),
    new RAM512(),
    new RAM512(),
    new RAM512(),
    new RAM512(),
    new RAM512(),
  ];

  public write(input: Bus16, load: Binary, address: Binary12): Bus16 {
    const res: Bus8 = dmux8way(load, address.concat().splice(0, 3) as Binary3);
    const tmp: Bus16x8 = this.registers.map((ram512: RAM512, i: number) => {
      return ram512.write(input, res[i], address.concat().splice(3, 9) as Binary9);
    }) as Bus16x8;
    return mux8way16(...tmp, address.concat().splice(0, 3) as Binary3);
  }
}
