import { b } from '../../hardware/helpers';
import { Binary, Binary3, Binary7 } from '../../hardware/types';

const compDict: { [key: string]: string } = {
  '0': '0101010',
  '1': '0111111',
  '-1': '0111010',
  D: '0001100',
  A: '0110000',
  '!D': '0001101',
  '!A': '0110001',
  '-D': '0001111',
  '-A': '0110011',
  'D+1': '0011111',
  'A+1': '0110111',
  'D-1': '0001110',
  'A-1': '0110010',
  'D+A': '0000010',
  'D-A': '0010011',
  'A-D': '0000111',
  'D&A': '0000000',
  'D|A': '0010101',
  M: '1110000',
  '!M': '1110001',
  '-M': '1110011',
  'M+1': '1110111',
  'M-1': '1110010',
  'D+M': '1000010',
  'D-M': '1010011',
  'M-D': '1000111',
  'D&M': '1000000',
  'D|M': '1010101',
};

const jumpDict: { [key: string]: string } = {
  JGT: '001',
  JEQ: '010',
  JGE: '011',
  JLT: '100',
  JNE: '101',
  JLE: '110',
  JMP: '111',
};

export class Code {
  public dest(mnemonic: string | null): Binary3 {
    if (!mnemonic) {
      return [0, 0, 0];
    }

    const d1: Binary = mnemonic.indexOf('A') === -1 ? 0 : 1;
    const d2: Binary = mnemonic.indexOf('D') === -1 ? 0 : 1;
    const d3: Binary = mnemonic.indexOf('M') === -1 ? 0 : 1;
    return [d1, d2, d3];
  }

  public comp(mnemonic: string): Binary7 {
    if (!compDict[mnemonic]) {
      return [0, 0, 0, 0, 0, 0, 0];
    }
    return b<Binary7>(compDict[mnemonic]);
  }

  public jump(mnemonic: string): Binary3 {
    if (!jumpDict[mnemonic]) {
      return [0, 0, 0];
    }
    return b<Binary3>(jumpDict[mnemonic]);
  }
}
