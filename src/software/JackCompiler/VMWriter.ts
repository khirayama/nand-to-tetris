export class VMWriter {
  public output: string = '';

  public writePush(segment: string, index: number): void {
    this.output += `push ${segment} ${index}` + '\n';
  }

  public writePop(segment: string, index: number): void {
    this.output += `pop ${segment} ${index}` + '\n';
  }

  public writeArithmetic(command: string): void {
    this.output += command + '\n';
  }

  public writeLabel(label: string): void {
    this.output += `label ${label}` + '\n';
  }

  public writeGoto(label: string): void {
    this.output += `goto ${label}` + '\n';
  }

  public writeIf(label: string): void {
    this.output += `if-goto ${label}` + '\n';
  }

  public writeCall(name: string, nArgs: number): void {
    this.output += `call ${name} ${nArgs}` + '\n';
  }

  public writeFunction(name: string, nLocals: number): void {
    this.output += `function ${name} ${nLocals}` + '\n';
  }

  public writeReturn(): void {
    this.output += 'return' + '\n';
  }
}
