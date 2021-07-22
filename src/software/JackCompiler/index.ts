import { CompilationEngine } from './CompilationEngine';

export function jackCompiler(code: { [key: string]: string }) {
  const result: {[key: string]: { vm: string; xml: string }} = {};
  for (const key of Object.keys(code).sort()) {
    const ce = new CompilationEngine(code[key]);
    result[key] = {
      vm: ce.vmWriter.output,
      xml: ce.output,
    };
  }
  return result;
}
