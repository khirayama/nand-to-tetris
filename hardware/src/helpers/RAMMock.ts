import { Binary, Binary15, Word } from '../hardware/types';
import { b, zero } from '../hardware/helpers';

export class RAMMock {
  private caches: { [key: string]: Word } = {};

  public lastAccessAddresses: Binary15[] = [];

  public write(input: Word, load: Binary, address: Binary15) {
    if (load === 1) {
      const key = address.join('');
      this.caches[key] = input;
      this.lastAccessAddresses.push(address);
    }
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
