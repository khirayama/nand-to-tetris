import { Binary3, Binary7 } from '../../hardware/types';

export class Code {
  private dest(mnemonic: string): Binary3 {
    return [0, 0, 0];
  }

  private comp(mnemonic: string): Binary7 {
    return [0, 0, 0, 0, 0, 0, 0];
  }

  private jump(mnemonic: string): Binary3 {
    return [0, 0, 0];
  }
}
