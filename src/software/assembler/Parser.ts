const CommandType = {
  A_COMMAND: 'A_COMMAND',
  C_COMMAND: 'C_COMMAND',
  L_COMMAND: 'L_COMMAND',
} as const;
type CommandType = typeof CommandType[keyof typeof CommandType];

export class Parser {
  constructor() {}

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
