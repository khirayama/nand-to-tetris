import { Binary } from './types';

export class DFF {
  private state: Binary = 0;

  constructor(input?: Binary) {
    this.state = input || this.state;
  }

  public write(input: Binary): Binary {
    const tmp = this.state;
    this.state = input;
    return tmp;
  }

  public read(): Binary {
    return this.state;
  }
}
