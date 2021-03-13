import { Clock } from './Clock';
import { zero } from './helpers';
import { Word } from './types';

export class Keyboard {
  private word: Word = zero();

  public write(clock: Clock) {
    if (clock.get() === 0) {
      // const stdin = process.stdin.
    }
  }
}
