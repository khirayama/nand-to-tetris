const CommandType = {
  A_COMMAND: 'A_COMMAND',
  C_COMMAND: 'C_COMMAND',
  L_COMMAND: 'L_COMMAND',
} as const;

type CommandType = typeof CommandType[keyof typeof CommandType];

type Instruction = string;

export class Parser {
  private instructions: Instruction[];

  private lineCounter: number = 0;

  /* TODO
   * Originally, we should give a file path,
   * but we have to consider how to run it on web browser.
   * For now, I set instructions directry.
   */
  constructor(instructions: Instruction[]) {
    this.instructions = instructions;
  }

  private currentCommand() {
    return this.instructions[this.lineCounter];
  }

  public hasMoreCommands(): boolean {
    return this.instructions.length > this.lineCounter;
  }

  public advance(): void {}

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
}
