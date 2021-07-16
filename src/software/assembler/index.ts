import { Parser, CommandType } from './Parser';
import { Code } from './Code';
import { SymbolTable } from './SymbolTable';

export function assembler(asm: string) {
  const parser = new Parser(asm);
  const code = new Code();
  const symbolTable = new SymbolTable();

  let ROMAddress = 0;
  let RAMAddress = 16;

  while (parser.hasMoreCommands()) {
    const commandType = parser.commandType();
    if (commandType == CommandType.A_COMMAND || commandType === CommandType.C_COMMAND) {
      ROMAddress = ROMAddress + 1;
    } else if (commandType === CommandType.L_COMMAND) {
      const sym = parser.symbol();

      if (!symbolTable.contains(sym)) {
        const hexAddress = '0x' + ('0000' + ROMAddress.toString(16).slice(-4));
        symbolTable.addEntry(sym, hexAddress);
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
      machineCodes.push(`111${comp.join('')}${dest.join('')}${jump.join('')}`);
    }

    if (commandType === CommandType.A_COMMAND) {
      const sym = parser.symbol();
      if (isNaN(parseInt(sym, 10))) {
        let hexAddress = '';
        if (symbolTable.contains(sym)) {
          hexAddress = symbolTable.getHexAddress(sym);
        } else {
          hexAddress = `0x0000${RAMAddress.toString(16).slice(-4)}`;
          symbolTable.addEntry(sym, hexAddress);
          RAMAddress = RAMAddress + 1;
        }
        machineCodes.push(`0000000000000000${parseInt(hexAddress, 16).toString(2)}`.slice(-16));
      } else {
        machineCodes.push(`0000000000000000${parseInt(sym, 10).toString(2)}`.slice(-16));
      }
    }
    parser.advance();
  }
  return machineCodes;
}
