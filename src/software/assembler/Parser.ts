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
  constructor(instructions: Instruction[]) {
    this.instructions = instructions;
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
    return CommandType.A_COMMAND;
  }

  public symbol(): string {
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
