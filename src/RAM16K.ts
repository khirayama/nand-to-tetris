import { Binary, Bus8, Bus16 } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { RAM4K } from './RAM4K';

type Bus16x8 = [Bus16, Bus16, Bus16, Bus16, Bus16, Bus16, Bus16, Bus16];

type Binary3 = [Binary, Binary, Binary];

type Binary6 = [...Binary3, ...Binary3];

type Binary12 = [...Binary6, ...Binary6];

type Binary15 = [...Binary6, ...Binary6, ...Binary3];

export class RAM16K {
  private registers: [RAM4K, RAM4K, RAM4K, RAM4K, RAM4K, RAM4K, RAM4K, RAM4K] = [
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
  ];

  public write(input: Bus16, load: Binary, address: Binary15): Bus16 {
    const res: Bus8 = dmux8way(load, address.concat().splice(0, 3) as Binary3);
    const tmp: Bus16x8 = this.registers.map((ram4K: RAM4K, i: number) => {
      return ram4K.write(input, res[i], address.concat().splice(3, 12) as Binary12);
    }) as Bus16x8;
    return mux8way16(...tmp, address.concat().splice(0, 3) as Binary3);
  }
}
