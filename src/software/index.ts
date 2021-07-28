import { jackCompiler } from './JackCompiler';
import { vmTranslator } from './VMTranslator';
import { assembler } from './assembler';
import { OS } from './OS';

function compiledJackToVM(compiledJack: { [key: string]: { vm: string; xml: string } }) {
  const keys = Object.keys(compiledJack);
  const result: { [key: string]: string } = {};
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    result[key] = compiledJack[key].vm;
  }
  return result;
}

const mainJack = `
class Main {
    function void main() {
        var String s;
    
    	let s = String.new(1);
    	do s.appendChar(String.doubleQuote());
    
        do Output.moveCursor(0, 63);
        do Output.printChar(66);
        do Output.moveCursor(22, 0);
        do Output.printChar(67);
        do Output.moveCursor(22, 63);
        do Output.printChar(68);
        do Output.printChar(65);
        
        do Output.moveCursor(2, 0);
        do Output.printString("0123456789");
        do Output.println();
        
        do Output.printString("ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz");
        do Output.println();
        
        // do Output.printString("!#$%&'()*+,-./:;<=>?@[\]^_\`{|}~");
        do Output.printString(s);
        do Output.println();
        
        do Output.printInt(-12345);
        do Output.backSpace();
        do Output.printInt(6789);
        
        return;
    }
}
`;

const result = jackCompiler({ ...OS, Main: mainJack });
const asm = vmTranslator(compiledJackToVM(result));
const instructions = assembler(asm);
console.log(instructions.join('\n'));
