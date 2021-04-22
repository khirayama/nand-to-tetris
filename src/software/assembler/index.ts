import { Parser } from './Parser';
import { Code } from './Code';
import { SymbolTable } from './SymbolTable';

export function assembler() {
  const parser = new Parser();
  const code = new Code();
  const symbolTable = new SymbolTable();
}
