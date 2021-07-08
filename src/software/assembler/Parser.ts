export const CommandType = {
  A_COMMAND: 'A_COMMAND',
  C_COMMAND: 'C_COMMAND',
  L_COMMAND: 'L_COMMAND',
} as const;

export type CommandType = typeof CommandType[keyof typeof CommandType];

export type Instruction = string;

export class Parser {
  private instructions: Instruction[];

  private pos: number = 0;

  /* TODO
   * Originally, we should give a file path,
   * but we have to consider how to run it on web browser.
   * For now, I set instructions directry.
   */
  constructor(code: string) {
    const lines = code.replace(/ /g, '').split(/\r/n/);
    this.instructions = lines.filter((line) => {
      return line !== '' && line.indexOf('//') !== 0;
    });
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
    if (this.currentCommand().indexOf('@') === 0) {
      return CommandType.A_COMMAND;
    } else if (this.currentCommand().indexOf('(') === 0) {
      return CommandType.L_COMMAND;
    } else {
      return CommandType.C_COMMAND;
    }
  }

  public symbol(): string {
    if (this.commandType() === CommandType.C_COMMAND) {
      throw new Error('commandType should be C_COMMAND when call symbol.');
    } else if (this.commandType() === CommandType.A_COMMAND) {
      return this.currentCommand().slice(1);
    } else if (this.commandType() === CommandType.L_COMMAND) {
      return this.currentCommand().slice(1, -1);
    }
    return '';
  }

  public dest(): string {
    return '';
  }

  public comp(): string {
    return '';
  }

  public jump(): string {
    return '';
  }

  public reset(): void {
    this.pos = 0;
  }
}
