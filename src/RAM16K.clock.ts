import { Binary, Binary2, Binary4, Binary8, Binary12, Binary14, Word, Word8 } from './types';
import { dmux4way } from './dmux4way';
import { dmux4way16 } from './dmux4way16';
import { Clock } from './Clock';
import { RAM4K } from './RAM4K.clock';

export class RAM16K {
  private rams: [RAM4K, RAM4K, RAM4K, RAM4K, RAM4K, RAM4K, RAM4K, RAM4K] = [
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
    new RAM4K(),
  ];

  public write(clock: Clock, input: Word, load: Binary, address: Binary14): void {
    const res: Binary4 = dmux4way(load, address.concat().splice(0, 2) as Binary2);
    this.rams.map((ram8: RAM4K, i: number) => {
      ram8.write(clock, input, res[i], address.concat().splice(3, 9) as Binary12);
    });
  }

  public read(clock: Clock, address: Binary14): Word {
    return dmux4way16(
      ...(this.rams.map((ram) =>
        ram.read(clock, [
          address[2],
          address[3],
          address[4],
          address[5],
          address[6],
          address[7],
          address[8],
          address[9],
          address[10],
          address[11],
          address[12],
          address[13],
        ]),
      ) as Word8),
      [address[0], address[1]],
    );
  }
}
