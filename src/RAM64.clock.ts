import { Binary, Binary3, Binary6, Binary8, Word, Word8 } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { Clock } from './Clock';
import { RAM8 } from './RAM8.clock';

export class RAM64 {
  private rams: [RAM8, RAM8, RAM8, RAM8, RAM8, RAM8, RAM8, RAM8] = [
    new RAM8(),
    new RAM8(),
    new RAM8(),
    new RAM8(),
    new RAM8(),
    new RAM8(),
    new RAM8(),
    new RAM8(),
  ];

  public write(clock: Clock, input: Word, load: Binary, address: Binary6): void {
    const res: Binary8 = dmux8way(load, address.concat().splice(0, 3) as Binary3);
    this.rams.map((ram8: RAM8, i: number) => {
      ram8.write(clock, input, res[i], address.concat().splice(3, 3) as Binary3);
    });
  }

  public read(clock: Clock, address: Binary6): Word {
    return mux8way16(...(this.rams.map((ram) => ram.read(clock, [address[3], address[4], address[5]])) as Word8), [
      address[0],
      address[1],
      address[2],
    ]);
  }
}
