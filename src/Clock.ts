import { Binary } from './types';

/*
 * 0 Tick
 * 1 Tock
 */

export class Clock {
  private state: Binary = 0;

  public get(): Binary {
    return this.state;
  }

  public next(): void {
    this.state = this.state === 0 ? 1 : 0;
  }
}
