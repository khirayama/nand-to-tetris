import { Parser, CommandType } from './Parser';
import { Code } from './Code';
import { SymbolTable } from './SymbolTable';

export function assembler() {
  const parser = new Parser([]);
  const code = new Code();
  const symbolTable = new SymbolTable();

  let ROMAddress = 0;
  const RAMAddress = 16;

  while (parser.hasMoreCommands()) {
    const commandType = parser.commandType();
    if (commandType == CommandType.A_COMMAND || commandType === CommandType.C_COMMAND) {
      ROMAddress = ROMAddress + 1;
    } else if (commandType === CommandType.L_COMMAND) {
      const sym = parser.symbol();

      if (!symbolTable.constants(sym)) {
        const address = '0x' + ('0000' + ROMAddress.toString(16).slice(-4));
        symbolTable.addEntry(sym, address);
      }
    } else {
      throw new Error('Invalid Command Type');
    }
    parser.advance();
  }

  parser.reset();

  const machineCodes = [];

  while (parser.hasMoreCommands()) {
    const commandType = parser.commandType();

    if (commandType === CommandType.C_COMMAND) {
      const destMnemonic = parser.dest();
      const compMnemonic = parser.comp();
      const jumpMnemonic = parser.jump();

      const dest = code.dest(destMnemonic);
      const comp = code.comp(compMnemonic);
      const jump = code.jump(jumpMnemonic);
      machineCodes.push(`111${comp}${dest}${jump}`);
    }
  }
}
