import { Parser, CommandType } from './Parser';
import { CodeWriter } from './CodeWriter';

export function vmTranslator(fileName: string, vm: { [key: string]: string }): string {
  const codeWriter = new CodeWriter();
  for (const filePath of Object.keys(vm).sort()) {
    translate(fileName, vm[filePath], codeWriter);
  }
  return codeWriter.output;
}

function translate(fileName: string, code: string, codeWriter: CodeWriter) {
  const parser = new Parser(code);
  codeWriter.setFileName(fileName);

  while (parser.hasMoreCommands()) {
    switch (parser.commandType()) {
      case CommandType.C_ARITHMETIC:
        const command = parser.arg1();
        if (command) {
          codeWriter.writeArithmetic(command);
        }
        break;
      case CommandType.C_PUSH:
      case CommandType.C_POP:
        const segment = parser.arg1();
        const index = parser.arg2();

        if (index === null) {
          throw new Error('invalid index');
        }

        if (segment) {
          codeWriter.writePushPop(parser.commandType(), segment, index);
        }
        break;
      case CommandType.C_LABEL:
        const label = parser.arg1();
        if (!label) {
          throw new Error('invalid label');
        }

        codeWriter.writeLabel(label);
        break;
      case CommandType.C_GOTO:
        const gotoLabel = parser.arg1();
        if (!gotoLabel) {
          throw new Error('invalid gotoLabel');
        }

        codeWriter.writeGoto(gotoLabel);
        break;
      case CommandType.C_IF:
        const ifLabel = parser.arg1();
        if (!ifLabel) {
          throw new Error('invalid ifLabel');
        }

        codeWriter.writeIf(ifLabel);
        break;
      case CommandType.C_FUNCTION:
        const functionName = parser.arg1();
        const numLocals = parser.arg2() ? Number(parser.arg2()) : 0;
        if (functionName) {
          codeWriter.writeFunction(functionName, numLocals);
        }
        break;
      case CommandType.C_RETURN:
        codeWriter.writeReturn();
        break;
      case CommandType.C_CALL:
        const callFunctionName = parser.arg1();
        const numArgs = parser.arg2() ? Number(parser.arg2()) : 0;
        if (callFunctionName) {
          codeWriter.writeCall(callFunctionName, numArgs);
        }
        break;
      default:
        throw new Error('invalid commandType');
    }
    parser.advance();
  }
}
