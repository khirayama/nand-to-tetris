import { CPU } from '../hardware/CPU';
import { b } from '../hardware/helpers';
import { inc16 } from '../hardware/inc16';
import { Binary15, Word } from '../hardware/types';
import { RAMMock } from './RAMMock';

export function writeInstructionsToROM(rom: RAMMock, instructionStrings: string[]) {
  rom.clear();

  let address = b<Word>('0000 0000 0000 0000');

  for (let i = 0; i < instructionStrings.length; i += 1) {
    const instruction = b<Word>(instructionStrings[i]);
    rom.write(instruction, 1, address.slice(1) as Binary15);
    address = inc16(address);
  }
}

export function next(cpu: CPU, rom: RAMMock, memory: RAMMock) {
  let cs = cpu.status();
  let instruction = rom.read(cs.pc.slice(1) as Binary15);
  let res = cpu.write(memory.read(cs.aregister.slice(1) as Binary15), instruction, 0);
  const input = res[0];
  const load = res[1];
  const address = res[2];

  memory.write(input, load, address);
}
