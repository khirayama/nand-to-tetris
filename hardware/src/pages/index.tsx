import * as React from 'react';
import { css } from 'styled-jsx/css';
import Head from 'next/head';

import { CPU } from '../hardware/CPU';
import { b, zero } from '../hardware/helpers';
import { inc16 } from '../hardware/inc16';
import { Binary15, Word } from '../hardware/types';
import { samples } from '../samples';

import { RAMMock } from '../helpers/RAMMock';
import { resetStyles } from '../components/resetStyles';
import { Controller } from '../components/Controller';
import { ScreenViewer } from '../components/ScreenViewer';
import { ROMViewer } from '../components/ROMViewer';
import { MemoryViewer } from '../components/MemoryViewer';
import { CPUViewer } from '../components/CPUViewer';
import { next, writeInstructionsToROM } from '../helpers/utils';

const styles = css`
  .container {
    width: 1110px;
    margin: 0 auto;
  }

  .left-column,
  .right-column {
    display: inline-block;
    vertical-align: top;
    padding: 12px 6px;
    height: 100%;
  }

  .cpu-viewer-container {
    margin: 12px 0;
  }

  .rom-viewer-container,
  .memory-viewer-container {
    display: inline-block;
    height: 100%;
    vertical-align: top;
  }

  .rom-viewer-container + .memory-viewer-container {
    margin-left: 12px;
  }
`;

const cpu = new CPU();
const rom = new RAMMock(); // new RAM16K()
const memory = new RAMMock(); // new Memory()

writeInstructionsToROM(rom, samples.add);
memory.write(b('0000 0000 0000 1011'), 1, b('000 0000 0000 0000'));
memory.write(b('0000 0000 0000 1001'), 1, b('000 0000 0000 0001'));

let timerId: number | null = null;
let keyCode: number | null = null;

export default function IndexPage() {
  const cs = cpu.status();

  const [cpuStatus, setCpuStatus] = React.useState(cs);
  const [displayedROMAddresses, setDisplayedROMAddresses] = React.useState<Binary15[]>(rom.activeAddresses());
  const [displayedMemoryAddresses, setDisplayedMemoryAddresses] = React.useState<Binary15[]>(memory.activeAddresses());

  React.useEffect(() => {
    window.document.addEventListener('keydown', (event) => {
      if (keyCode === null) {
        keyCode = event.key.charCodeAt(0);
        const input: Word = b(('0000000000000000' + keyCode.toString(2)).slice(-16));
        memory.write(input, 1, b('110 0000 0000 0000'));
      }
    });

    window.document.addEventListener('keyup', () => {
      keyCode = null;
      memory.write(b('0000 0000 0000 0000'), 1, b('110 0000 0000 0000'));
    });
  }, []);

  const onNextClick = React.useCallback(() => {
    next(cpu, rom, memory);
    const cs = cpu.status();
    setDisplayedMemoryAddresses(memory.activeAddresses());
    setCpuStatus(cs);
  }, []);

  const onStartClick = React.useCallback(() => {
    if (timerId === null) {
      timerId = window.setInterval(() => {
        let count = 10;
        while (count > 0) {
          next(cpu, rom, memory);
          count -= 1;
        }
        const cs = cpu.status();
        setDisplayedMemoryAddresses(memory.activeAddresses());
        setCpuStatus(cs);
      }, 50);
    }
  }, []);

  const onStopClick = React.useCallback(() => {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }, []);

  const onSelectChange = React.useCallback((event: React.FormEvent<HTMLSelectElement>) => {
    const value = event.currentTarget.value;
    writeInstructionsToROM(rom, samples[value]);
    setDisplayedROMAddresses(rom.activeAddresses());

    cpu.reset();
    setCpuStatus(cpu.status());
  }, []);

  const onResetClick = React.useCallback(() => {
    cpu.reset();
    setCpuStatus(cpu.status());
  }, []);

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

      <div className="container">
        <div className="left-column">
          <Controller
            onNextClick={onNextClick}
            onResetClick={onResetClick}
            onSelectChange={onSelectChange}
            onStartClick={onStartClick}
            onStopClick={onStopClick}
          />

          <section className="cpu-viewer-container">
            <CPUViewer pc={cpuStatus.pc} aregister={cpuStatus.aregister} dregister={cpuStatus.dregister} />
          </section>

          <section className="screen-viewer-container">
            <ScreenViewer memory={memory} />
          </section>
        </div>

        <div className="right-column">
          <section className="rom-viewer-container">
            <ROMViewer rom={rom} pc={cpuStatus.pc} addresses={displayedROMAddresses} />
          </section>

          <section className="memory-viewer-container">
            <MemoryViewer memory={memory} aregister={cpuStatus.aregister} addresses={displayedMemoryAddresses} />
          </section>
        </div>
      </div>
    </>
  );
}
