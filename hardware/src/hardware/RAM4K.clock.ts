import { Binary, Binary3, Binary8, Binary9, Binary12, Word, Word8 } from './types';
import { dmux8way } from './dmux8way';
import { mux8way16 } from './mux8way16';
import { Clock } from './Clock';
import { RAM512 } from './RAM512.clock';

export class RAM4K {
  private rams: [RAM512, RAM512, RAM512, RAM512, RAM512, RAM512, RAM512, RAM512] = [
    new RAM512(),
    new RAM512(),
    new RAM512(),
    new RAM512(),
    new RAM512(),
    new RAM512(),
    new RAM512(),
    new RAM512(),
  ];

  public write(clock: Clock, input: Word, load: Binary, address: Binary12): void {
    const res: Binary8 = dmux8way(load, address.concat().splice(0, 3) as Binary3);
    this.rams.map((ram8: RAM512, i: number) => {
      ram8.write(clock, input, res[i], address.concat().splice(3, 9) as Binary9);
    });
  }

  public read(clock: Clock, address: Binary12): Word {
    return mux8way16(
      ...(this.rams.map((ram) =>
        ram.read(clock, [
          address[3],
          address[4],
          address[5],
          address[6],
          address[7],
          address[8],
          address[9],
          address[10],
          address[11],
        ]),
      ) as Word8),
      [address[0], address[1], address[2]],
    );
  }
}
