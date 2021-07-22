import { KIND } from './CompilationEngine';

type SymbolTableAssociative = {
  [key: string]: {
    type: string;
    kind: string;
    index: number;
  };
};

export class SymbolTable {
  private staticTable: SymbolTableAssociative = {};

  private fieldTable: SymbolTableAssociative = {};

  private argTable: SymbolTableAssociative = {};

  private varTable: SymbolTableAssociative = {};

  public startSubroutine(): void {
    this.argTable = {};
    this.varTable = {};
  }

  public define(name: string, type: string, kind: string): void {
    switch (kind) {
      case KIND.STATIC: {
        this.staticTable[name] = {
          type: type,
          kind: kind,
          index: this.varCount(KIND.STATIC),
        };
        break;
      }
      case KIND.FIELD: {
        this.fieldTable[name] = {
          type: type,
          kind: kind,
          index: this.varCount(KIND.FIELD),
        };
        break;
      }
      case KIND.ARGUMENT: {
        this.argTable[name] = {
          type: type,
          kind: kind,
          index: this.varCount(KIND.ARGUMENT),
        };
        break;
      }
      case KIND.VAR: {
        this.varTable[name] = {
          type: type,
          kind: kind,
          index: this.varCount(KIND.VAR),
        };
        break;
      }
      default: {
        throw new Error('invalid kind in define method.');
      }
    }
  }

  public varCount(kind: string): number {
    switch (kind) {
      case KIND.STATIC: {
        return Object.keys(this.staticTable).length;
      }
      case KIND.FIELD: {
        return Object.keys(this.fieldTable).length;
      }
      case KIND.ARGUMENT: {
        return Object.keys(this.argTable).length;
      }
      case KIND.VAR: {
        return Object.keys(this.varTable).length;
      }
      default: {
        throw new Error('invalid kind in varCount method.');
      }
    }
    return 0;
  }

  public kindOf(name: string): string {
    if (name in this.argTable) {
      return this.argTable[name].kind;
    } else if (name in this.varTable) {
      return this.varTable[name].kind;
    } else if (name in this.staticTable) {
      return this.staticTable[name].kind;
    } else if (name in this.fieldTable) {
      return this.fieldTable[name].kind;
    } else {
      return KIND.NONE;
    }
    return '';
  }

  public typeOf(name: string): string {
    if (name in this.argTable) {
      return this.argTable[name].type;
    } else if (name in this.varTable) {
      return this.varTable[name].type;
    } else if (name in this.staticTable) {
      return this.staticTable[name].type;
    } else if (name in this.fieldTable) {
      return this.fieldTable[name].type;
    } else {
      throw new Error(`invalid name for typeOf, name: ${name}.`);
    }
    return '';
  }

  public indexOf(name: string): number {
    if (name in this.argTable) {
      return this.argTable[name].index;
    } else if (name in this.varTable) {
      return this.varTable[name].index;
    } else if (name in this.staticTable) {
      return this.staticTable[name].index;
    } else if (name in this.fieldTable) {
      return this.fieldTable[name].index;
    } else {
      throw new Error(`invalid name for indexOf, name: ${name}.`);
    }
    return 0;
  }
}
