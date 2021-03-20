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
import { ALUViewer } from '../components/ALUViewer';

const styles = css`
  .left-column,
  .right-column {
    display: inline-block;
    vertical-align: top;
    padding: 12px;
  }

  .cpu-viewer-container {
    margin: 12px 0;
  }

  .alu-viewer-container {
    margin: 12px 0;
  }

  .rom-viewer-container {
    display: inline-block;
  }

  .memory-viewer-container {
    display: inline-block;
  }

  .rom-viewer-container + .memory-viewer-container {
    margin-left: 12px;
  }
`;

const rom = new RAM16K();
const memory = new Memory();
const cpu = new CPU();
const logger = new Logger(rom, memory);

function writeInstructionsToROM(instructionStrings: string[]) {
  logger.resetActiveROMAddress();

  let address = b<Word>('0000 0000 0000 0000');

  for (let i = 0; i < instructionStrings.length; i += 1) {
    const instruction = b<Word>(instructionStrings[i]);
    logger.writeROM(instruction, 1, address.slice(1) as Binary15);
    address = inc16(address);
  }
}

writeInstructionsToROM(samples.add);
logger.writeMemory(b('0000 0000 0000 0001'), 1, b('000 0000 0000 0000'));
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

      <div className="left-column">
        <Controller onNextClick={onNextClick} onResetClick={onResetClick} onSelectChange={onSelectChange} />

        <section className="cpu-viewer-container">
          <CPUViewer pc={cpuStatus.pc} aregister={cpuStatus.aregister} dregister={cpuStatus.dregister} />
        </section>

        <section className="alu-viewer-container">
          <ALUViewer dInput={cpuStatus.dregister} maInput={cpuStatus.aregister} output={cpuStatus.dregister} />
        </section>

        <section className="screen-viewer-container">
          <ScreenViewer />
        </section>
      </div>

      <div className="right-column">
        <section className="rom-viewer-container">
          <ROMViewer rom={rom} pc={cpuStatus.pc} addresses={displayedROMAddresses} onSelectChange={onSelectChange} />
        </section>
        <section className="memory-viewer-container">
          <MemoryViewer memory={memory} aregister={cpuStatus.aregister} addresses={displayedMemoryAddresses} />
        </section>
      </div>
    </>
  );
}
