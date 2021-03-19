import { RAM16K } from '../hardware/RAM16K';
import { Memory } from '../hardware/Memory';
import { Binary, Binary15, Word } from '../hardware/types';

export class Logger {
  public rom: RAM16K;

  public memory: Memory;

  public activeROMAddresses: Binary15[] = [];

  public activeMemoryAddresses: Binary15[] = [];

  constructor(rom: RAM16K, memory: Memory) {
    this.rom = rom;
    this.memory = memory;
  }

  public writeROM(input: Word, load: Binary, address: Binary15) {
    if (load) {
      const set = new Set(this.activeROMAddresses.map((activeROMAddress) => activeROMAddress.join('')));
      set.add(address.join(''));
      this.activeROMAddresses = Array.from(set)
        .sort()
        .map((addrss: string) => addrss.split('').map((adrs) => Number(adrs))) as Binary15[];
    }
    this.rom.write(input, load, address);
  }

  public writeMemory(input: Word, load: Binary, address: Binary15) {
    if (load) {
      const set = new Set(this.activeMemoryAddresses.map((activeMemoryAddress) => activeMemoryAddress.join('')));
      set.add(address.join(''));
      this.activeMemoryAddresses = Array.from(set)
        .sort()
        .map((addrss: string) => addrss.split('').map((adrs) => Number(adrs))) as Binary15[];
    }
    this.memory.write(input, load, address);
  }

  public resetActiveROMAddress() {
    this.activeROMAddresses = [];
  }

  public resetActiveMemoryAddress() {
    this.activeMemoryAddresses = [];
  }
}
