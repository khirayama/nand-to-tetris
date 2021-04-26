const CommandType = {
  A_COMMAND: 'A_COMMAND',
  C_COMMAND: 'C_COMMAND',
  L_COMMAND: 'L_COMMAND',
} as const;

type CommandType = typeof CommandType[keyof typeof CommandType];

type Instruction = string;

export class Parser {
  private instructions: Instruction[];

  /* TODO
   * Originally, we should give a file path,
   * but we have to consider how to run it on web browser.
   * For now, I set instructions directry.
   */
  constructor(instructions: Instruction[]) {
    this.instructions = instructions;
  }

  private hasMoreCommands(): boolean {
    return true;
  }

  private advance(): void {}

  private commandType(): CommandType {
    return CommandType.A_COMMAND;
  }

  private symbol(): string {
    return '';
  }

  private dest(): string {
    return '';
  }

  private comp(): string {
    return '';
  }

  private jump(): string {
    return '';
  }
}
