import { Binary3, Binary7 } from '../../hardware/types';

export class Code {
  public dest(mnemonic: string): Binary3 {
    return [0, 0, 0];
  }

  public comp(mnemonic: string): Binary7 {
    return [0, 0, 0, 0, 0, 0, 0];
  }

  public jump(mnemonic: string): Binary3 {
    return [0, 0, 0];
  }
}
