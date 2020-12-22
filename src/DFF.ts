import { Binary } from './types';
import { Clock } from './Clock';

export class DFF {
  private state: Binary = 0;

  private prev: Binary = 0;

  public write(input: Binary, clock: Clock): void {
    if (clock.get() === 0) {
      this.prev = this.state;
      this.state = input;
    }
  }

  public read(clock: Clock): Binary {
    if (clock.get() === 0) {
      return this.prev;
    }
    return this.state;
  }
}
