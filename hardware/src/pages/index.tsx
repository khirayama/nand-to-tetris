import * as React from 'react';
import { css } from 'styled-jsx/css';
import Head from 'next/head';

import { CPU } from '../hardware/CPU';
import { b, zero } from '../hardware/helpers';
import { inc16 } from '../hardware/inc16';
import { Memory } from '../hardware/Memory';
import { RAM16K } from '../hardware/RAM16K';
import { Binary15, Word } from '../hardware/types';
import { samples } from '../samples';

import { Logger } from '../helpers/Logger';
import { resetStyles } from '../components/resetStyles';
import { Controller } from '../components/Controller';
import { ScreenViewer } from '../components/ScreenViewer';
import { ROMViewer } from '../components/ROMViewer';
import { MemoryViewer } from '../components/MemoryViewer';
import { CPUViewer } from '../components/CPUViewer';

const styles = css`
  .container {
    display: flex;
  }
  .container section {
    flex: 1;
  }
`;

const rom = new RAM16K();
const memory = new Memory();
const cpu = new CPU();
const logger = new Logger(rom, memory);

function writeInstructionsToROM(instructionStrings: string[]) {
  let address = b<Word>('0000 0000 0000 0000');

  for (let i = 0; i < instructionStrings.length; i += 1) {
    const instruction = b<Word>(instructionStrings[i]);
    logger.writeROM(instruction, 1, address.slice(1) as Binary15);
    address = inc16(address);
  }
}

writeInstructionsToROM(samples.add);
logger.writeMemory(b('0000 0000 0000 1011'), 1, b('000 0000 0000 0000'));
logger.writeMemory(b('0000 0000 0000 1001'), 1, b('000 0000 0000 0001'));

export default function IndexPage() {
  const cs = cpu.status();

  let inM = memory.read(cs.aregister.slice(1) as Binary15);

  const [cpuStatus, setCpuStatus] = React.useState(cs);
  const [displayedROMAddresses, setDisplayedROMAddresses] = React.useState<Binary15[]>(logger.activeROMAddresses);
  const [displayedMemoryAddresses, setDisplayedMemoryAddresses] = React.useState<Binary15[]>(
    logger.activeMemoryAddresses,
  );

  function onNextClick() {
    let cs = cpu.status();
    let instruction = rom.read(cs.pc.slice(1) as Binary15);
    let res = cpu.write(inM, instruction, 0);
    const input = res[0];
    const load = res[1];
    const address = res[2];

    logger.writeMemory(input, load, address);
    setDisplayedMemoryAddresses(logger.activeMemoryAddresses);

    cs = cpu.status();

    inM = memory.read(address);
    setCpuStatus(cs);
  }

  function onSelectChange(event: React.FormEvent<HTMLSelectElement>) {
    const value = event.currentTarget.value;
    writeInstructionsToROM(samples[value]);
    setDisplayedROMAddresses(logger.activeROMAddresses);

    cpu.reset();
    setCpuStatus(cpu.status());
    inM = zero();
  }

  function onResetClick() {
    cpu.reset();
    setCpuStatus(cpu.status());
    inM = zero();
  }

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet" />
      </Head>
      <style jsx global>
        {resetStyles}
      </style>
      <style jsx>{styles}</style>
      <Controller onNextClick={onNextClick} onResetClick={onResetClick} />
      <div>
        <CPUViewer pc={cpuStatus.pc} aregister={cpuStatus.aregister} dregister={cpuStatus.dregister} />
      </div>

      <div className="container">
        <section>
          <select onChange={onSelectChange}>
            <option value="add">Add</option>
            <option value="max">Max</option>
            <option value="rect">Rect</option>
          </select>
          <ROMViewer rom={rom} addresses={displayedROMAddresses} />
        </section>

        <section>
          <MemoryViewer memory={memory} addresses={displayedMemoryAddresses} />
        </section>
      </div>
      <ScreenViewer />
    </>
  );
}
