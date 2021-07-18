import { CommandType } from './Parser';

export class CodeWriter {
  public output: string = '';

  public fileName: string = '';

  public labelNumForCompare: number = 0;

  public labelNumForReturnAddress: number = 0;

  constructor() {
    this.writeInit();
  }

  private writeInit(): void {
    this.writeCodes(['@256', 'D=A', '@SP', 'M=D']);
    this.writeCall('Sys.init', 0);
  }

  public setFileName(fileName: string): void {
    this.fileName = fileName;
  }

  public writeArithmetic(command: string): void {
    switch (command) {
      case 'neg':
      case 'not': {
        this.writeCalc1Value(command);
        break;
      }
      case 'add':
      case 'sub':
      case 'and':
      case 'or': {
        this.writeCalc2Value(command);
        break;
      }
      case 'eq':
      case 'gt':
      case 'lt': {
        this.writeCompare(command);
        break;
      }
      default: {
        throw new Error('invalid command for writeArithmetic');
      }
    }
  }

  public writePushPop(command: string, segment: string, index: number | null): void {
    if (index === null) {
      return;
    }

    if (command === CommandType.C_PUSH) {
      switch (segment) {
        case 'constant': {
          this.writeCodes([`@${index}`, 'D=A']);
          this.writePushFromD();
          break;
        }
        case 'local':
        case 'argument':
        case 'this':
        case 'that': {
          this.writePushFromReferencedSegment(segment, index);
          break;
        }
        case 'pointer':
        case 'temp': {
          this.writePushFromFixedSegment(segment, index);
          break;
        }
        case 'static': {
          this.writeCodes([`@${this.fileName}.${index}`, 'D=M']);
          this.writePushFromD();
          break;
        }
        default: {
          throw new Error('invalid segment.');
        }
      }
    } else if (command === CommandType.C_POP) {
      switch (segment) {
        case 'local':
        case 'argument':
        case 'this':
        case 'that': {
          this.writePopToReferencedSegment(segment, index);
          break;
        }
        case 'pointer':
        case 'temp': {
          this.writePopToFixedSegment(segment, index);
          break;
        }
        case 'static': {
          this.writePopToA();
          this.writeCodes(['D=M', `@${this.fileName}.${index}`, 'M=D']);
          break;
        }
        default: {
          throw new Error('invalid segment.');
        }
      }
    } else {
      throw new Error('invalid command for writePushPop.');
    }
  }

  public writeLabel(label: string): void {
    this.writeCodes([`(${label})`]);
  }

  public writeGoto(label: string): void {
    this.writeCodes([`@${label}`, '0;JMP']);
  }

  public writeIf(label: string): void {
    this.writePopToA();
    this.writeCodes(['D=M', `@${label}`, 'D;JNE']);
  }

  public writeCall(functionName: string, numArgs: number): void {
    this.writeCodes([`@RETURN_ADDRESS_${this.labelNumForReturnAddress}`, 'D=A']);
    this.writePushFromD();

    this.writeCodes(['@LCL', 'D=M']);
    this.writePushFromD();

    this.writeCodes(['@ARG', 'D=M']);
    this.writePushFromD();

    this.writeCodes(['@THIS', 'D=M']);
    this.writePushFromD();

    this.writeCodes(['@THAT', 'D=M']);
    this.writePushFromD();

    this.writeCodes([
      '@SP',
      'D=M',
      `@${numArgs}`,
      'D=D-A',
      `@5`,
      'D=D-A',
      '@ARG',
      'M=D',
      '@SP',
      'D=M',
      '@LCL',
      'M=D',
      `@${functionName}`,
      '0;JMP',
      `(RETURN_ADDRESS_${this.labelNumForReturnAddress})`,
    ]);

    this.labelNumForReturnAddress = this.labelNumForReturnAddress + 1;
  }

  public writeReturn(): void {
    this.writeCodes(['@LCL', 'D=M', '@R13', 'M=D', '@5', 'D=A', '@R13', 'A=M-D', 'D=M', '@R14', 'M=D']);

    this.writePopToA();
    this.writeCodes([
      'D=M',
      '@ARG',
      'A=M',
      'M=D',

      '@ARG',
      'D=M+1',
      '@SP',
      'M=D',

      '@R13',
      'AM=M-1',
      'D=M',
      '@THAT',
      'M=D',

      '@R13',
      'AM=M-1',
      'D=M',
      '@THIS',
      'M=D',

      '@R13',
      'AM=M-1',
      'D=M',
      '@ARG',
      'M=D',

      '@R13',
      'AM=M-1',
      'D=M',
      '@LCL',
      'M=D',

      '@R14',
      'A=M',
      '0;JMP',
    ]);
  }

  public writeFunction(functionName: string, numLocals: number = 0): void {
    this.writeCodes([`(${functionName})`, 'D=0']);
    for (let i = 0; i < numLocals; i++) {
      this.writePushFromD();
    }
  }

  private writeCalc1Value(command: string): void {
    let formula: string = '';
    switch (command) {
      case 'neg': {
        formula = 'D=-M';
        break;
      }
      case 'not': {
        formula = 'D=!M';
        break;
      }
      default: {
        throw new Error('invalid command for writeCalc1Value.');
      }
    }

    this.writePopToA();
    this.writeCodes([formula]);
    this.writePushFromD();
  }

  private writeCalc2Value(command: string): void {
    let formula: string = '';
    switch (command) {
      case 'add': {
        formula = 'D=D+M';
        break;
      }
      case 'sub': {
        formula = 'D=M-D';
        break;
      }
      case 'and': {
        formula = 'D=D&M';
        break;
      }
      case 'or': {
        formula = 'D=D|M';
        break;
      }
      default: {
        throw new Error('invalid command for writeCalc2Value.');
      }
    }

    this.writePopToA();
    this.writeCodes(['D=M']);
    this.writePopToA();
    this.writeCodes([formula]);
    this.writePushFromD();
  }

  private writeCompare(command: string): void {
    let mnemonic;
    switch (command) {
      case 'eq': {
        mnemonic = 'JEQ';
        break;
      }
      case 'gt': {
        mnemonic = 'JGT';
        break;
      }
      case 'lt': {
        mnemonic = 'JLT';
        break;
      }
      default: {
        throw new Error('invalid command for writeCompare.');
      }
    }

    this.writePopToA();
    this.writeCodes(['D=M']);
    this.writePopToA();
    this.writeCodes([
      'D=M-D',
      `@RETURN_TRUE_${this.labelNumForCompare}`,
      `D;${mnemonic}`,
      'D=0',
      `@NEXT_${this.labelNumForCompare}`,
      '0;JMP',
      `(RETURN_TRUE_${this.labelNumForCompare})`,
      'D=-1',
      `(NEXT_${this.labelNumForCompare})`,
    ]);
    this.writePushFromD();
    this.labelNumForCompare = this.labelNumForCompare + 1;
  }

  private writeCodes(codes: Array<string>): void {
    this.output += codes.join('\n') + '\n';
  }

  private writePopToA(): void {
    this.writeCodes(['@SP', 'M=M-1', 'A=M']);
  }

  private writePushFromD(): void {
    this.writeCodes(['@SP', 'A=M', 'M=D', '@SP', 'M=M+1']);
  }

  private writePushFromReferencedSegment(segment: string, index: number): void {
    const label = this.getLabelBySegment(segment);
    this.writeCodes([`@${label}`, 'A=M']);

    if (index) {
      this.writeCodes(new Array(index).fill('A=A+1'));
    }

    this.writeCodes(['D=M']);
    this.writePushFromD();
  }

  private writePopToReferencedSegment(segment: string, index: number): void {
    this.writePopToA();

    const label = this.getLabelBySegment(segment);
    this.writeCodes(['D=M', `@${label}`, 'A=M']);

    if (index) {
      this.writeCodes(new Array(index).fill('A=A+1'));
    }

    this.writeCodes(['M=D']);
  }

  private writePushFromFixedSegment(segment: string, index: number): void {
    const label = this.getLabelBySegment(segment);
    this.writeCodes([`@${label}`]);

    if (index) {
      this.writeCodes(new Array(index).fill('A=A+1'));
    }

    this.writeCodes(['D=M']);
    this.writePushFromD();
  }

  private writePopToFixedSegment(segment: string, index: number): void {
    this.writePopToA();

    const label = this.getLabelBySegment(segment);
    this.writeCodes(['D=M', `@${label}`]);

    if (index) {
      this.writeCodes(new Array(index).fill('A=A+1'));
    }

    this.writeCodes(['M=D']);
  }

  private getLabelBySegment(segment: string): string {
    let label: string = '';

    switch (segment) {
      case 'local': {
        label = 'LCL';
        break;
      }
      case 'argument': {
        label = 'ARG';
        break;
      }
      case 'this': {
        label = 'THIS';
        break;
      }
      case 'that': {
        label = 'THAT';
        break;
      }
      case 'pointer': {
        label = '3';
        break;
      }
      case 'temp': {
        label = '5';
        break;
      }
      default: {
        throw new Error('invalid segment.');
      }
    }

    return label;
  }
}
