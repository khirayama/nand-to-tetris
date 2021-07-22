import { KEYWORDS, TOKEN_TYPE, SYMBOLS } from './CompilationEngine';

export class JackTokenizer {
  private tokens: string[];

  private pos: number = 0;

  constructor(content: string) {
    while (content.indexOf('/*') !== -1) {
      const commentStartIndex = content.indexOf('/*');
      const commentEndIndex = content.indexOf('*/');
      content = content.slice(0, commentStartIndex) + content.slice(commentEndIndex + 2);
    }

    const lines = content.split(/\n/).filter((line) => {
      return line.trim() !== '' && !line.trim().startsWith('//');
    });

    const linesWithoutComments = lines.map((line) => {
      return line.split('//')[0].trim();
    });

    this.tokens = [];
    const reg = /[\{\}\(\)\[\]\.,;\+\-\*\/&\|<>=~]/;
    const parserUnit = (unit: string) => {
      while (unit) {
        if (unit.match(reg)) {
          const checkedUnit = unit.match(reg);
          if (!checkedUnit) {
            throw new Error(`invalid unit is ${unit}.`);
          }

          const index = Number(checkedUnit.index);
          if (index !== 0) {
            this.tokens.push(unit.slice(0, index));
          }
          this.tokens.push(unit.slice(index, index + 1));
          unit = unit.slice(index + 1);
        } else {
          this.tokens.push(unit);
          unit = '';
        }
      }
    };

    linesWithoutComments.forEach((line) => {
      while (line) {
        const doubleQuoteIndex = line.indexOf('"');
        const spaceIndex = line.indexOf(' ');
        if (line.startsWith('"')) {
          const index = line.indexOf('"', 1);
          this.tokens.push(line.slice(0, index + 1));
          line = line.slice(index + 1).trim();
        } else if (doubleQuoteIndex !== -1 && spaceIndex !== -1 && doubleQuoteIndex < spaceIndex) {
          const unit = line.slice(0, doubleQuoteIndex);
          parserUnit(unit);
          line = line.slice(doubleQuoteIndex).trim();
        } else if (spaceIndex !== -1) {
          const unit = line.slice(0, spaceIndex);
          parserUnit(unit);
          line = line.slice(spaceIndex + 1).trim();
        } else {
          parserUnit(line);
          line = '';
        }
      }
    });
  }

  public currentToken() {
    return this.tokens[this.pos];
  }

  public hasMoreTokens(): boolean {
    return this.tokens.length > this.pos;
  }

  public advance(): void {
    if (this.hasMoreTokens()) {
      this.pos += 1;
    }
  }

  public tokenType(): string {
    if (Object.values(KEYWORDS).includes(this.currentToken())) {
      return TOKEN_TYPE.KEYWORD;
    } else if (Object.values(SYMBOLS).includes(this.currentToken())) {
      return TOKEN_TYPE.SYMBOL;
    } else if (this.currentToken().match(/^[0-9]+$/) && Number(this.currentToken()) <= 32767) {
      return TOKEN_TYPE.INT_CONST;
    } else if (this.currentToken().match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
      return TOKEN_TYPE.IDENTIFIER;
    } else if (this.currentToken().match(/^"[^"\n]*"$/)) {
      return TOKEN_TYPE.STRING_CONST;
    } else {
      throw new Error(`invalid tokenType. currentToken: ${this.currentToken()}.`);
    }
  }

  public keyWord(): string | null {
    return this.tokenType() === TOKEN_TYPE.KEYWORD ? this.currentToken() : null;
  }

  public symbol(): string | null {
    return this.tokenType() === TOKEN_TYPE.SYMBOL ? this.currentToken() : null;
  }

  public identifier(): string | null {
    return this.tokenType() === TOKEN_TYPE.IDENTIFIER ? this.currentToken() : null;
  }

  public intVal(): string | null {
    return this.tokenType() === TOKEN_TYPE.INT_CONST ? this.currentToken() : null;
  }

  public stringVal(): string | null {
    return this.tokenType() === TOKEN_TYPE.STRING_CONST ? this.currentToken().slice(1, -1) : null;
  }
}
