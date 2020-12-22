import { Binary } from './types';
import { Clock } from './Clock';

export class DFF {
  private state: Binary = 0;

  private prev: Binary = 0;

  private clock: Clock;

  constructor(clock: Clock) {
    this.clock = clock;
  }

  public write(input: Binary): void {
    if (this.clock.get() === 0) {
      this.prev = this.state;
      this.state = input;
    }
  }

  public read(): Binary {
    if (this.clock.get() === 0) {
      return this.prev;
    }
    return this.state;
  }
}
