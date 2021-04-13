import { Binary } from './types';

export class DFF {
  private state: Binary = 0;

  public write(input: Binary): void {
    this.state = input;
  }

  public read(): Binary {
    return this.state;
  }
}
