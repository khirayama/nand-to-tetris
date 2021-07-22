import { JackTokenizer } from './JackTokenizer';
import { SymbolTable } from './SymbalTable';
import { VMWriter } from './VMWriter';

export const TOKEN_TYPE = {
  KEYWORD: 'KEYWORD',
  SYMBOL: 'SYMBOL',
  INT_CONST: 'INT_CONST',
  STRING_CONST: 'STRING_CONST',
  IDENTIFIER: 'IDENTIFIER',
};

export const KEYWORDS = {
  CLASS: 'class',
  CONSTRUCTOR: 'constructor',
  FUNCTION: 'function',
  METHOD: 'method',
  FIELD: 'field',
  STATIC: 'static',
  VAR: 'var',
  INT: 'int',
  CHAR: 'char',
  BOOLEAN: 'boolean',
  VOID: 'void',
  TRUE: 'true',
  FALSE: 'false',
  NULL: 'null',
  THIS: 'this',
  LET: 'let',
  DO: 'do',
  IF: 'if',
  ELSE: 'else',
  WHILE: 'while',
  RETURN: 'return',
};

export const SYMBOLS = {
  LEFT_CURLY_BRACKET: '{',
  RIGHT_CURLY_BRACKET: '}',
  LEFT_ROUND_BRACKET: '(',
  RIGHT_ROUND_BRACKET: ')',
  LEFT_SQUARE_BRACKET: '[',
  RIGHT_SQUARE_BRACKET: ']',
  PERIOD: '.',
  COMMA: ',',
  SEMI_COLON: ';',
  PLUS_SIGN: '+',
  HYPHEN: '-',
  ASTERISK: '*',
  SLASH: '/',
  AMPERSAND: '&',
  VERTICAL_LINE: '|',
  LESS_THAN_SIGN: '<',
  GREATER_THAN_SIGN: '>',
  EQUAL: '=',
  TILDE: '~',
};

export const SEGMENT = {
  CONST: 'constant',
  ARGUMENT: 'argument',
  LOCAL: 'local',
  STATIC: 'static',
  THIS: 'this',
  THAT: 'that',
  POINTER: 'pointer',
  TEMP: 'temp',
};

export const KIND = {
  STATIC: 'static',
  FIELD: 'field',
  ARGUMENT: 'argument',
  VAR: 'var',
  NONE: 'none',
};

export const COMMAND = {
  ADD: 'add',
  SUB: 'sub',
  NEG: 'neg',
  AND: 'and',
  OR: 'or',
  NOT: 'not',
  LT: 'lt',
  GT: 'gt',
  EQ: 'eq',
};

export class CompilationEngine {
  private jackTokenizer: JackTokenizer;

  private symbolTable: SymbolTable;

  private className: string = '';

  private indentCount: number = 0;

  private labelCount: number = 0;

  public vmWriter: VMWriter;

  public output: string = '';

  constructor(code: string) {
    this.jackTokenizer = new JackTokenizer(code);
    this.symbolTable = new SymbolTable();
    this.vmWriter = new VMWriter();

    this.compileClass();
  }

  private writeElement(tagName: string, value: string): void {
    const indent = '  '.repeat(this.indentCount);
    this.output += `${indent}<${tagName}> ${value} </${tagName}>` + '\n';
  }

  private writeIdentifier(name: string, isDefined: boolean) {
    const indent = '  '.repeat(this.indentCount);

    const kind = this.symbolTable.kindOf(name);
    const type = this.symbolTable.typeOf(name);
    const index = this.symbolTable.indexOf(name);
    const info = `isDefined: ${isDefined}, type: ${type}, kind: ${kind}, index: ${index}`;

    this.output += `${indent}<identifier> ${name} </identifier> ${info}` + '\n';
  }

  private writeElementStart(tagName: string): void {
    const indent = '  '.repeat(this.indentCount);
    this.output += `${indent}<${tagName}>` + '\n';

    this.indentCount = this.indentCount + 1;
  }

  private writeElementEnd(tagName: string): void {
    this.indentCount = this.indentCount - 1;
    const indent = '  '.repeat(this.indentCount);
    this.output += `${indent}</${tagName}>` + '\n';
  }

  private compileKeyword(keywords: Array<string>): void {
    const keyword = this.jackTokenizer.keyWord();
    if (keyword === null) {
      throw new Error('is null keyword.');
    }
    if (!keywords.includes(keyword)) {
      throw new Error(`invalid keyword, keyword: ${keyword}, expected keywords: ${keywords}.`);
    }
    this.checkToken(TOKEN_TYPE.KEYWORD);
    this.writeElement('keyword', keyword);
    this.jackTokenizer.advance();
  }

  private compileSymbol(symbols: Array<string>): void {
    let symbol = this.jackTokenizer.symbol();
    if (symbol === null) {
      throw new Error('is null symbol.');
    }
    if (!symbols.includes(symbol)) {
      throw new Error(
        `invalid symbol, symbol: ${symbol}, expected symbols: ${symbols}, currentToken: ${this.jackTokenizer.currentToken()}.`,
      );
    }
    this.checkToken(TOKEN_TYPE.SYMBOL);

    if (this.jackTokenizer.currentToken() === '<') {
      symbol = '&lt;';
    } else if (this.jackTokenizer.currentToken() === '>') {
      symbol = '&gt;';
    } else if (this.jackTokenizer.currentToken() === '&') {
      symbol = '&amp;';
    }
    this.writeElement('symbol', symbol);
    this.jackTokenizer.advance();
  }

  private compileIntegerConstant(): void {
    this.checkToken(TOKEN_TYPE.INT_CONST);

    const intVal = this.jackTokenizer.intVal();
    if (intVal === null) {
      throw new Error('is null intVal.');
    }
    this.writeElement('integerConstant', intVal);
    this.jackTokenizer.advance();
  }

  private compileStringConstant(): void {
    this.checkToken(TOKEN_TYPE.STRING_CONST);

    const stringVal = this.jackTokenizer.stringVal();
    if (stringVal === null) {
      throw new Error('is null stringVal.');
    }

    this.writeElement('stringConstant', stringVal);
    this.vmWriter.writePush(SEGMENT.CONST, stringVal.length);
    this.vmWriter.writeCall('String.new', 1);
    for (let i = 0; i < stringVal.length; i++) {
      this.vmWriter.writePush(SEGMENT.CONST, stringVal.charCodeAt(i));
      this.vmWriter.writeCall('String.appendChar', 2);
    }
    this.jackTokenizer.advance();
  }

  private compileIdentifier(): void {
    this.checkToken(TOKEN_TYPE.IDENTIFIER);

    const identifierVal = this.jackTokenizer.identifier();
    if (identifierVal === null) {
      throw new Error('is null identifierVal.');
    }
    this.writeElement('identifier', identifierVal);
    this.jackTokenizer.advance();
  }

  private compileVarName(
    isDefined: boolean,
    type: string | null = null,
    kind: string | null = null,
    shouldWritePush: boolean = false,
  ) {
    this.checkToken(TOKEN_TYPE.IDENTIFIER);
    const name = this.jackTokenizer.identifier();
    if (name === null) {
      throw new Error('is null name.');
    }
    if (isDefined) {
      if (type === null) {
        throw new Error('invalid type is null.');
      }
      if (kind === null) {
        throw new Error('invalid kind is null.');
      }
      this.symbolTable.define(name, type, kind);
    } else if (shouldWritePush) {
      kind = this.symbolTable.kindOf(name);
      const index = this.symbolTable.indexOf(name);

      if (shouldWritePush) {
        let segment = '';
        if (kind === KIND.STATIC) {
          segment = SEGMENT.STATIC;
        } else if (kind === KIND.FIELD) {
          segment = SEGMENT.THIS;
        } else if (kind === KIND.ARGUMENT) {
          segment = SEGMENT.ARGUMENT;
        } else if (kind === KIND.VAR) {
          segment = SEGMENT.LOCAL;
        }
        this.vmWriter.writePush(segment, index);
      }
    }
    this.writeIdentifier(name, isDefined);
    this.jackTokenizer.advance();
  }

  private checkToken(type: string): void {
    const token = this.jackTokenizer.currentToken();
    const tokenType = this.jackTokenizer.tokenType();
    if (type !== tokenType) {
      throw new Error(`invalid token, token: ${token}, tokenType: ${tokenType}, expected type: ${type}.`);
    }
  }

  private compileClass(): void {
    this.writeElementStart('class');

    this.compileKeyword([KEYWORDS.CLASS]);
    this.className = this.jackTokenizer.currentToken();
    this.compileIdentifier();
    this.compileSymbol([SYMBOLS.LEFT_CURLY_BRACKET]);
    while ([KEYWORDS.STATIC, KEYWORDS.FIELD].includes(this.jackTokenizer.currentToken())) {
      this.compileClassVarDec();
    }
    while ([KEYWORDS.CONSTRUCTOR, KEYWORDS.FUNCTION, KEYWORDS.METHOD].includes(this.jackTokenizer.currentToken())) {
      this.compileSubroutine();
    }
    this.compileSymbol([SYMBOLS.RIGHT_CURLY_BRACKET]);
    this.writeElementEnd('class');
  }

  private compileClassVarDec(): void {
    this.writeElementStart('classVarDec');

    const kind = this.jackTokenizer.currentToken();
    this.compileKeyword([KEYWORDS.STATIC, KEYWORDS.FIELD]);
    const type = this.jackTokenizer.currentToken();
    this.compileType();
    this.compileVarName(true, type, kind);

    while (this.jackTokenizer.currentToken() !== SYMBOLS.SEMI_COLON) {
      this.compileSymbol([SYMBOLS.COMMA]);
      this.compileVarName(true, type, kind);
    }
    this.compileSymbol([SYMBOLS.SEMI_COLON]);
    this.writeElementEnd('classVarDec');
  }

  private compileType(): void {
    if ([KEYWORDS.INT, KEYWORDS.CHAR, KEYWORDS.BOOLEAN].includes(this.jackTokenizer.currentToken())) {
      this.compileKeyword([KEYWORDS.INT, KEYWORDS.CHAR, KEYWORDS.BOOLEAN]);
    } else {
      this.compileIdentifier();
    }
  }

  private compileSubroutine(): void {
    this.symbolTable.startSubroutine();
    this.writeElementStart('subroutineDec');

    const subroutineKeyword = this.jackTokenizer.currentToken();
    if (subroutineKeyword === KEYWORDS.METHOD) {
      this.symbolTable.define('this', this.className, SEGMENT.ARGUMENT);
    }

    this.compileKeyword([KEYWORDS.CONSTRUCTOR, KEYWORDS.FUNCTION, KEYWORDS.METHOD]);
    if (this.jackTokenizer.currentToken() === KEYWORDS.VOID) {
      this.compileKeyword([KEYWORDS.CONSTRUCTOR, KEYWORDS.FUNCTION, KEYWORDS.METHOD, KEYWORDS.VOID]);
    } else {
      this.compileType();
    }

    const functionName = this.className + '.' + this.jackTokenizer.currentToken();
    this.compileIdentifier();
    this.compileSymbol([SYMBOLS.LEFT_ROUND_BRACKET]);
    this.compileParameterList();
    this.compileSymbol([SYMBOLS.RIGHT_ROUND_BRACKET]);
    this.compileSubroutineBody(functionName, subroutineKeyword);

    this.writeElementEnd('subroutineDec');
  }

  private compileParameterList(): void {
    this.writeElementStart('parameterList');

    while (
      [KEYWORDS.INT, KEYWORDS.CHAR, KEYWORDS.BOOLEAN].includes(this.jackTokenizer.currentToken()) ||
      this.jackTokenizer.tokenType() === TOKEN_TYPE.IDENTIFIER
    ) {
      const type = this.jackTokenizer.currentToken();
      this.compileType();
      this.compileVarName(true, type, KIND.ARGUMENT);

      while (this.jackTokenizer.currentToken() === SYMBOLS.COMMA) {
        this.compileSymbol([SYMBOLS.COMMA]);
        const type = this.jackTokenizer.currentToken();
        this.compileType();
        this.compileVarName(true, type, KIND.ARGUMENT);
      }
    }
    this.writeElementEnd('parameterList');
  }

  private compileSubroutineBody(functionName: string, subroutineKeyword: string): void {
    this.writeElementStart('subroutineBody');
    this.compileSymbol([SYMBOLS.LEFT_CURLY_BRACKET]);

    this.vmWriter.writeFunction(functionName, 0);
    if (subroutineKeyword === KEYWORDS.CONSTRUCTOR) {
      this.vmWriter.writePush(SEGMENT.CONST, this.symbolTable.varCount(KIND.FIELD));
      this.vmWriter.writeCall('Memory.alloc', 1);
      this.vmWriter.writePop(SEGMENT.POINTER, 0);
    } else if (subroutineKeyword === KEYWORDS.METHOD) {
      this.vmWriter.writePush(SEGMENT.ARGUMENT, 0);
      this.vmWriter.writePop(SEGMENT.POINTER, 0);
    }

    let nLocals = 0;
    while (this.jackTokenizer.currentToken() === KEYWORDS.VAR) {
      const varNum = this.compileVarDec();
      nLocals = nLocals + varNum;
    }

    if (nLocals !== 0) {
      const fileContent = this.vmWriter.output;
      const newContent = fileContent.replace(`${functionName} 0`, `${functionName} ${nLocals}`);
      this.vmWriter.output = newContent;
    }

    this.compileStatements();
    this.compileSymbol([SYMBOLS.RIGHT_CURLY_BRACKET]);

    this.writeElementEnd('subroutineBody');
  }

  private compileVarDec(): number {
    this.writeElementStart('varDec');

    this.compileKeyword([KEYWORDS.VAR]);
    const type = this.jackTokenizer.currentToken();
    this.compileType();
    this.compileVarName(true, type, KIND.VAR);

    let varNum = 1;
    while (this.jackTokenizer.currentToken() === SYMBOLS.COMMA) {
      varNum = varNum + 1;
      this.compileSymbol([SYMBOLS.COMMA]);
      this.compileVarName(true, type, KIND.VAR);
    }
    this.compileSymbol([SYMBOLS.SEMI_COLON]);

    this.writeElementEnd('varDec');
    return varNum;
  }

  private compileStatements(): void {
    this.writeElementStart('statements');

    while (
      [KEYWORDS.LET, KEYWORDS.IF, KEYWORDS.WHILE, KEYWORDS.DO, KEYWORDS.RETURN].includes(
        this.jackTokenizer.currentToken(),
      )
    ) {
      if (this.jackTokenizer.currentToken() === KEYWORDS.LET) {
        this.compileLet();
      } else if (this.jackTokenizer.currentToken() === KEYWORDS.IF) {
        this.compileIf();
      } else if (this.jackTokenizer.currentToken() === KEYWORDS.WHILE) {
        this.compileWhile();
      } else if (this.jackTokenizer.currentToken() === KEYWORDS.DO) {
        this.compileDo();
      } else if (this.jackTokenizer.currentToken() === KEYWORDS.RETURN) {
        this.compileReturn();
      } else {
        throw new Error(`invalid statement, currentToken: ${this.jackTokenizer.currentToken()}.`);
      }
    }

    this.writeElementEnd('statements');
  }

  private compileDo(): void {
    this.writeElementStart('doStatement');

    this.compileKeyword([KEYWORDS.DO]);
    this.compileSubroutineCall();
    this.compileSymbol([SYMBOLS.SEMI_COLON]);

    this.vmWriter.writePop(SEGMENT.TEMP, 0);
    this.writeElementEnd('doStatement');
  }

  private compileLet(): void {
    this.writeElementStart('letStatement');

    this.compileKeyword([KEYWORDS.LET]);
    const name = this.jackTokenizer.currentToken();
    this.compileVarName(false);
    const kind = this.symbolTable.kindOf(name);
    const index = this.symbolTable.indexOf(name);

    if (this.jackTokenizer.currentToken() !== SYMBOLS.EQUAL) {
      this.compileSymbol([SYMBOLS.LEFT_SQUARE_BRACKET]);
      this.compileExpression(); // push i
      this.compileSymbol([SYMBOLS.RIGHT_SQUARE_BRACKET]);

      if (kind === KIND.STATIC) {
        this.vmWriter.writePush(SEGMENT.STATIC, index);
      } else if (kind === KIND.FIELD) {
        this.vmWriter.writePush(SEGMENT.THIS, index);
      } else if (kind === KIND.ARGUMENT) {
        this.vmWriter.writePush(SEGMENT.ARGUMENT, index);
      } else if (kind === KIND.VAR) {
        this.vmWriter.writePush(SEGMENT.LOCAL, index);
      }
      this.vmWriter.writeArithmetic(COMMAND.ADD);

      this.compileSymbol([SYMBOLS.EQUAL]);
      this.compileExpression();
      this.vmWriter.writePop(SEGMENT.TEMP, 0);
      this.vmWriter.writePop(SEGMENT.POINTER, 1);
      this.vmWriter.writePush(SEGMENT.TEMP, 0);
      this.vmWriter.writePop(SEGMENT.THAT, 0);
    } else {
      this.compileSymbol([SYMBOLS.EQUAL]);
      this.compileExpression();
      if (kind === KIND.STATIC) {
        this.vmWriter.writePop(SEGMENT.STATIC, index);
      } else if (kind === KIND.FIELD) {
        this.vmWriter.writePop(SEGMENT.THIS, index);
      } else if (kind === KIND.ARGUMENT) {
        this.vmWriter.writePop(SEGMENT.ARGUMENT, index);
      } else if (kind === KIND.VAR) {
        this.vmWriter.writePop(SEGMENT.LOCAL, index);
      }
    }

    this.compileSymbol([SYMBOLS.SEMI_COLON]);

    this.writeElementEnd('letStatement');
  }

  private compileWhile(): void {
    this.writeElementStart('whileStatement');

    const labelLoop = `WHILE_LOOP_${this.labelCount}`;
    const labelEnd = `WHILE_END_${this.labelCount}`;
    this.labelCount = this.labelCount + 1;

    this.vmWriter.writeLabel(labelLoop);
    this.compileKeyword([KEYWORDS.WHILE]);
    this.compileSymbol([SYMBOLS.LEFT_ROUND_BRACKET]);
    this.compileExpression();
    this.vmWriter.writeArithmetic(COMMAND.NOT);
    this.vmWriter.writeIf(labelEnd);
    this.compileSymbol([SYMBOLS.RIGHT_ROUND_BRACKET]);
    this.compileSymbol([SYMBOLS.LEFT_CURLY_BRACKET]);
    this.compileStatements();
    this.compileSymbol([SYMBOLS.RIGHT_CURLY_BRACKET]);
    this.vmWriter.writeGoto(labelLoop);
    this.vmWriter.writeLabel(labelEnd);

    this.writeElementEnd('whileStatement');
  }

  private compileReturn(): void {
    this.writeElementStart('returnStatement');

    this.compileKeyword([KEYWORDS.RETURN]);
    if (this.jackTokenizer.currentToken() !== SYMBOLS.SEMI_COLON) {
      this.compileExpression();
    } else {
      this.vmWriter.writePush(SEGMENT.CONST, 0);
    }
    this.compileSymbol([SYMBOLS.SEMI_COLON]);

    this.vmWriter.writeReturn();
    this.writeElementEnd('returnStatement');
  }

  private compileIf(): void {
    this.writeElementStart('ifStatement');

    const labelElse = `IF_ELSE_${this.labelCount}`;
    const labelEnd = `IF_END_${this.labelCount}`;
    this.labelCount = this.labelCount + 1;

    this.compileKeyword([KEYWORDS.IF]);
    this.compileSymbol([SYMBOLS.LEFT_ROUND_BRACKET]);
    this.compileExpression();
    this.vmWriter.writeArithmetic(COMMAND.NOT);
    this.vmWriter.writeIf(labelElse);
    this.compileSymbol([SYMBOLS.RIGHT_ROUND_BRACKET]);
    this.compileSymbol([SYMBOLS.LEFT_CURLY_BRACKET]);
    this.compileStatements();
    this.compileSymbol([SYMBOLS.RIGHT_CURLY_BRACKET]);
    this.vmWriter.writeGoto(labelEnd);

    this.vmWriter.writeLabel(labelElse);
    if (this.jackTokenizer.currentToken() === KEYWORDS.ELSE) {
      this.compileKeyword([KEYWORDS.ELSE]);
      this.compileSymbol([SYMBOLS.LEFT_CURLY_BRACKET]);
      this.compileStatements();
      this.compileSymbol([SYMBOLS.RIGHT_CURLY_BRACKET]);
    }
    this.vmWriter.writeLabel(labelEnd);

    this.writeElementEnd('ifStatement');
  }

  private compileSubroutineCall(): void {
    let name = this.jackTokenizer.currentToken();
    let nArgs = 0;

    const kind = this.symbolTable.kindOf(name);
    if (kind !== KIND.NONE) {
      const type = this.symbolTable.typeOf(name);
      const index = this.symbolTable.indexOf(name);
      nArgs = nArgs + 1;

      if (kind === KIND.STATIC) {
        this.vmWriter.writePush(SEGMENT.STATIC, index);
      } else if (kind === KIND.FIELD) {
        this.vmWriter.writePush(SEGMENT.THIS, index);
      } else if (kind === KIND.ARGUMENT) {
        this.vmWriter.writePush(SEGMENT.ARGUMENT, index);
      } else if (kind === KIND.VAR) {
        this.vmWriter.writePush(SEGMENT.LOCAL, index);
      }

      this.compileVarName(false);
      this.compileSymbol([SYMBOLS.PERIOD]);
      name = type + '.' + this.jackTokenizer.currentToken();
      this.compileIdentifier();
    } else {
      this.compileIdentifier();
      if (this.jackTokenizer.currentToken() === SYMBOLS.PERIOD) {
        this.compileSymbol([SYMBOLS.PERIOD]);
        name = name + '.' + this.jackTokenizer.currentToken();
        this.compileIdentifier();
      } else {
        this.vmWriter.writePush(SEGMENT.POINTER, 0);
        name = this.className + '.' + name;
        nArgs = nArgs + 1;
      }
    }

    this.compileSymbol([SYMBOLS.LEFT_ROUND_BRACKET]);
    nArgs = nArgs + this.compileExpressionList();
    this.compileSymbol([SYMBOLS.RIGHT_ROUND_BRACKET]);

    this.vmWriter.writeCall(name, nArgs);
  }

  private compileExpressionList(): number {
    this.writeElementStart('expressionList');

    let nArgs = 0;
    if (this.jackTokenizer.currentToken() !== SYMBOLS.RIGHT_ROUND_BRACKET) {
      nArgs = 1;
      this.compileExpression();

      while (this.jackTokenizer.currentToken() === SYMBOLS.COMMA) {
        this.compileSymbol([SYMBOLS.COMMA]);
        this.compileExpression();
        nArgs = nArgs + 1;
      }
    }

    this.writeElementEnd('expressionList');
    return nArgs;
  }

  private compileExpression(): void {
    this.writeElementStart('expression');
    this.compileTerm();

    while (
      [
        SYMBOLS.PLUS_SIGN,
        SYMBOLS.HYPHEN,
        SYMBOLS.ASTERISK,
        SYMBOLS.SLASH,
        SYMBOLS.AMPERSAND,
        SYMBOLS.VERTICAL_LINE,
        SYMBOLS.LESS_THAN_SIGN,
        SYMBOLS.GREATER_THAN_SIGN,
        SYMBOLS.EQUAL,
      ].includes(this.jackTokenizer.currentToken())
    ) {
      const symbol = this.jackTokenizer.currentToken();
      this.compileSymbol([
        SYMBOLS.PLUS_SIGN,
        SYMBOLS.HYPHEN,
        SYMBOLS.ASTERISK,
        SYMBOLS.SLASH,
        SYMBOLS.AMPERSAND,
        SYMBOLS.VERTICAL_LINE,
        SYMBOLS.LESS_THAN_SIGN,
        SYMBOLS.GREATER_THAN_SIGN,
        SYMBOLS.EQUAL,
      ]);
      this.compileTerm();

      if (symbol === SYMBOLS.PLUS_SIGN) {
        this.vmWriter.writeArithmetic(COMMAND.ADD);
      } else if (symbol === SYMBOLS.HYPHEN) {
        this.vmWriter.writeArithmetic(COMMAND.SUB);
      } else if (symbol === SYMBOLS.ASTERISK) {
        this.vmWriter.writeCall('Math.multiply', 2);
      } else if (symbol === SYMBOLS.SLASH) {
        this.vmWriter.writeCall('Math.divide', 2);
      } else if (symbol === SYMBOLS.AMPERSAND) {
        this.vmWriter.writeArithmetic(COMMAND.AND);
      } else if (symbol === SYMBOLS.VERTICAL_LINE) {
        this.vmWriter.writeArithmetic(COMMAND.OR);
      } else if (symbol === SYMBOLS.LESS_THAN_SIGN) {
        this.vmWriter.writeArithmetic(COMMAND.LT);
      } else if (symbol === SYMBOLS.GREATER_THAN_SIGN) {
        this.vmWriter.writeArithmetic(COMMAND.GT);
      } else if (symbol === SYMBOLS.EQUAL) {
        this.vmWriter.writeArithmetic(COMMAND.EQ);
      }
    }

    this.writeElementEnd('expression');
  }

  private compileTerm(): void {
    this.writeElementStart('term');

    if (this.jackTokenizer.tokenType() === TOKEN_TYPE.INT_CONST) {
      const index = Number(this.jackTokenizer.currentToken());
      this.vmWriter.writePush(SEGMENT.CONST, index);
      this.compileIntegerConstant();
    } else if (this.jackTokenizer.tokenType() === TOKEN_TYPE.STRING_CONST) {
      this.compileStringConstant();
    } else if (this.jackTokenizer.currentToken() === KEYWORDS.TRUE) {
      this.vmWriter.writePush(SEGMENT.CONST, 1);
      this.vmWriter.writeArithmetic(COMMAND.NEG);
      this.compileKeyword([KEYWORDS.TRUE]);
    } else if (this.jackTokenizer.currentToken() === KEYWORDS.FALSE) {
      this.vmWriter.writePush(SEGMENT.CONST, 0);
      this.compileKeyword([KEYWORDS.FALSE]);
    } else if (this.jackTokenizer.currentToken() === KEYWORDS.NULL) {
      this.vmWriter.writePush(SEGMENT.CONST, 0);
      this.compileKeyword([KEYWORDS.NULL]);
    } else if (this.jackTokenizer.currentToken() === KEYWORDS.THIS) {
      this.vmWriter.writePush(SEGMENT.POINTER, 0);
      this.compileKeyword([KEYWORDS.THIS]);
    } else if (this.jackTokenizer.tokenType() === TOKEN_TYPE.IDENTIFIER) {
      let name = this.jackTokenizer.currentToken();
      if (this.symbolTable.kindOf(name) !== KIND.NONE) {
        this.compileVarName(false, null, null, true);
      } else {
        this.compileIdentifier();
      }

      if (this.jackTokenizer.currentToken() === SYMBOLS.LEFT_SQUARE_BRACKET) {
        this.compileSymbol([SYMBOLS.LEFT_SQUARE_BRACKET]);
        this.compileExpression();
        this.compileSymbol([SYMBOLS.RIGHT_SQUARE_BRACKET]);
        this.vmWriter.writeArithmetic(COMMAND.ADD);
        this.vmWriter.writePop(SEGMENT.POINTER, 1);
        this.vmWriter.writePush(SEGMENT.THAT, 0);
      } else if (this.jackTokenizer.currentToken() === SYMBOLS.LEFT_ROUND_BRACKET) {
        this.compileSymbol([SYMBOLS.LEFT_ROUND_BRACKET]);
        const nArgs = this.compileExpressionList();
        this.compileSymbol([SYMBOLS.RIGHT_ROUND_BRACKET]);
        this.vmWriter.writeCall(name, nArgs);
      } else if (this.jackTokenizer.currentToken() === SYMBOLS.PERIOD) {
        this.compileSymbol([SYMBOLS.PERIOD]);
        let nArgs = 0;
        if (this.symbolTable.kindOf(name) !== KIND.NONE) {
          name = this.symbolTable.typeOf(name);
          nArgs = 1;
        }

        name = name + '.' + this.jackTokenizer.currentToken();
        this.compileIdentifier();
        this.compileSymbol([SYMBOLS.LEFT_ROUND_BRACKET]);
        nArgs = nArgs + this.compileExpressionList();
        this.compileSymbol([SYMBOLS.RIGHT_ROUND_BRACKET]);
        this.vmWriter.writeCall(name, nArgs);
      }
    } else if (this.jackTokenizer.currentToken() === SYMBOLS.LEFT_ROUND_BRACKET) {
      this.compileSymbol([SYMBOLS.LEFT_ROUND_BRACKET]);
      this.compileExpression();
      this.compileSymbol([SYMBOLS.RIGHT_ROUND_BRACKET]);
    } else if (this.jackTokenizer.currentToken() === SYMBOLS.HYPHEN) {
      this.compileSymbol([SYMBOLS.HYPHEN]);
      this.compileTerm();
      this.vmWriter.writeArithmetic(COMMAND.NEG);
    } else if (this.jackTokenizer.currentToken() === SYMBOLS.TILDE) {
      this.compileSymbol([SYMBOLS.TILDE]);
      this.compileTerm();
      this.vmWriter.writeArithmetic(COMMAND.NOT);
    } else {
      throw new Error(`invalid term: ${this.jackTokenizer.currentToken()}.`);
    }

    this.writeElementEnd('term');
  }
}
