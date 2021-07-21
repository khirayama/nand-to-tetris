export const CommandType = {
  C_ARITHMETIC: 'C_ARITHMETIC',
  C_PUSH: 'C_PUSH',
  C_POP: 'C_POP',
  C_LABEL: 'C_LABEL',
  C_GOTO: 'C_GOTO',
  C_IF: 'C_IF',
  C_FUNCTION: 'C_FUNCTION',
  C_RETURN: 'C_RETURN',
  C_CALL: 'C_CALL',
} as const;

export type CommandType = typeof CommandType[keyof typeof CommandType];

export class Parser {
  public instructions: string[];

  private pos: number = 0;

  constructor(code: string) {
    const lines = code.split(/\n/);
    this.instructions = lines.filter((line) => line !== '' && !line.startsWith('//'));
  }

  private currentCommand() {
    return this.instructions[this.pos];
  }

  public hasMoreCommands(): boolean {
    return this.instructions.length > this.pos;
  }

  public advance(): void {
    if (!this.hasMoreCommands()) {
      return;
    }
    this.pos = this.pos + 1;
  }

  public commandType(): CommandType {
    const cmd = this.currentCommand();
    if (cmd.indexOf('push') === 0) {
      return CommandType.C_PUSH;
    } else if (cmd.indexOf('pop') === 0) {
      return CommandType.C_POP;
    } else if (cmd.indexOf('label') === 0) {
      return CommandType.C_LABEL;
    } else if (cmd.indexOf('goto') === 0) {
      return CommandType.C_GOTO;
    } else if (cmd.indexOf('if-goto') === 0) {
      return CommandType.C_IF;
    } else if (cmd.indexOf('function') === 0) {
      return CommandType.C_FUNCTION;
    } else if (cmd.indexOf('return') === 0) {
      return CommandType.C_RETURN;
    } else if (cmd.indexOf('call') === 0) {
      return CommandType.C_CALL;
    } else {
      return CommandType.C_ARITHMETIC;
    }
  }

  public arg1(): string | null {
    if (this.commandType() === CommandType.C_RETURN) {
      return null;
    }
    if (this.commandType() === CommandType.C_ARITHMETIC) {
      return this.currentCommand().split(' ')[0] || null;
    }
    return this.currentCommand().split(' ')[1] || null;
  }

  public arg2(): number | null {
    if (
      this.commandType() === CommandType.C_PUSH ||
      this.commandType() === CommandType.C_POP ||
      this.commandType() === CommandType.C_FUNCTION ||
      this.commandType() === CommandType.C_CALL
    ) {
      return parseInt(this.currentCommand().split(' ')[2]);
    }
    return null;
  }
}
