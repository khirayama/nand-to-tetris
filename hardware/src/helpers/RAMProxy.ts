import { RAM16K } from '../hardware/RAM16K';
import { Memory } from '../hardware/Memory';
import { Binary, Binary15, Word } from '../hardware/types';
import { b, zero } from '../hardware/helpers';

export class RAMProxy {
  private caches: { [key: string]: Word } = {};

  private ram: Memory | RAM16K;

  constructor(ram: Memory | RAM16K) {
    this.ram = ram;
  }

  public write(input: Word, load: Binary, address: Binary15) {
    if (load === 1) {
      const key = address.join('');
      this.caches[key] = input;
    }
    return this.ram.write(input, load, address);
  }

  public read(address: Binary15): Word {
    const key = address.join('');
    return this.caches[key] ? this.caches[key] : zero();
  }

  public activeAddresses(): Binary15[] {
    return Object.keys(this.caches)
      .sort()
      .map((addrss) => b(addrss));
  }

  public clear() {
    this.caches = {};
  }
}
