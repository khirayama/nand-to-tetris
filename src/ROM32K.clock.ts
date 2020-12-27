import * as fs from 'fs';
import { Binary3, Binary12, Binary15, Word } from './types';
import { zero, b } from './helpers';
import { RAM4K } from './RAM4K.clock';
import { Clock } from './Clock';
import { dmux8way } from './dmux8way';
import { inc16 } from './inc16';
import { mux8way16 } from './mux8way16';

export class ROM32K {
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

  public write(clock: Clock) {
    this.rams.forEach((ram: RAM4K) => {
      ram.write(clock, zero(), 0, b<Binary12>('1111 1111 1111'));
    });
  }

  public innerWrite(clock: Clock, input: Word, address: Binary15) {
    const bits = dmux8way(1, [address[0], address[1], address[2]]);
    for (let i = 0; i < this.rams.length; i += 1) {
      this.rams[i].write(clock, input, bits[i], address.slice(3) as Binary12);
    }
  }

  public read(clock: Clock, address: Binary15): Word {
    return mux8way16(
      this.rams[0].read(clock, address.slice(3) as Binary12),
      this.rams[1].read(clock, address.slice(3) as Binary12),
      this.rams[2].read(clock, address.slice(3) as Binary12),
      this.rams[3].read(clock, address.slice(3) as Binary12),
      this.rams[4].read(clock, address.slice(3) as Binary12),
      this.rams[5].read(clock, address.slice(3) as Binary12),
      this.rams[6].read(clock, address.slice(3) as Binary12),
      this.rams[7].read(clock, address.slice(3) as Binary12),
      address.slice(0, 3) as Binary3,
    );
  }

  public load(filename: string) {
    const file = fs.readFileSync(filename, 'utf-8');
    const clock = new Clock();
    let counter = zero<Word>();
    for (const line of file.split('\n')) {
      const instruction = b<Word>(line);
      const address = counter.slice(1) as Binary15;
      this.innerWrite(clock, instruction, address);
      clock.next();
      this.write(clock);
      clock.next();
      counter = inc16(counter);
    }
    this.write(clock);
    // TODO readの意味あるの
    this.read(clock, b<Binary15>('111 1111 1111 1111'));
    clock.next();
    this.write(clock);
    // TODO readの意味あるの
    this.read(clock, b<Binary15>('111 1111 1111 1111'));
  }
}
