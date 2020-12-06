import { Binary, Bus8, Bus16 } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { RAM64 } from './RAM64';

type Bus16x8 = [Bus16, Bus16, Bus16, Bus16, Bus16, Bus16, Bus16, Bus16];

type Binary3 = [Binary, Binary, Binary];

type Binary6 = [...Binary3, ...Binary3];

type Binary9 = [...Binary3, ...Binary3, ...Binary3];

export class RAM512 {
  private registers: [RAM64, RAM64, RAM64, RAM64, RAM64, RAM64, RAM64, RAM64] = [
    new RAM64(),
    new RAM64(),
    new RAM64(),
    new RAM64(),
    new RAM64(),
    new RAM64(),
    new RAM64(),
    new RAM64(),
  ];

  public write(input: Bus16, load: Binary, address: Binary9): Bus16 {
    const res: Bus8 = dmux8way(load, address.concat().splice(0, 3) as Binary3);
    const tmp: Bus16x8 = this.registers.map((ram64: RAM64, i: number) => {
      return ram64.write(input, res[i], address.concat().splice(3, 6) as Binary6);
    }) as Bus16x8;
    return mux8way16(...tmp, address.concat().splice(0, 3) as Binary3);
  }
}
