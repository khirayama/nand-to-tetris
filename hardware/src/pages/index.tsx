import * as React from 'react';
import classnames from 'classnames';
import { css } from 'styled-jsx/css';

import { CPU } from '../hardware/CPU';
import { b, b2s, zero } from '../hardware/helpers';
import { inc16 } from '../hardware/inc16';
import { Memory } from '../hardware/Memory';
import { RAM16K } from '../hardware/RAM16K';
import { Binary15, Word } from '../hardware/types';
import { samples } from '../samples';

const styles = css`
  .container {
    display: flex;
  }
  .container section {
    flex: 1;
  }
  .is-current-instruction {
    background: yellow;
  }
  .is-current-address {
    background: yellow;
  }
  canvas {
    border: solid 1px #aaa;
  }
`;

function read(ram: any, len: number, start: number, end: number) {
  const result = [];
  for (let i = start; i < end; i += 1) {
    const bi = (zero<number[]>(len).join('') + i.toString(2)).slice(len * -1);
    const val = ram.read(b(bi));
    result.push({
      address: bi.split('').map((n) => Number(n)),
      value: val,
    });
  }
  return result;
}

function writeRom(rom: RAM16K, instructionStrings: string[]) {
  let address = b<Word>('0000 0000 0000 0000');

  for (let i = 0; i < instructionStrings.length; i += 1) {
    const instruction = b<Word>(instructionStrings[i]);
    rom.write(instruction, 1, address.slice(1) as Binary15);
    address = inc16(address);
  }
}

const count = 20;
const rom = new RAM16K();

writeRom(rom, samples.add);

const memory = new Memory();
const cpu = new CPU();

memory.write(b('0000 0000 0000 1011'), 1, b('000 0000 0000 0000'));
memory.write(b('0000 0000 0000 1001'), 1, b('000 0000 0000 0001'));

export default function IndexPage() {
  const cpuStatus = cpu.status();

  const [romPage, setRomPage] = React.useState(0);
  const [ramPage, setRamPage] = React.useState(0);
  const [pc, setPC] = React.useState(cpuStatus.pc.slice(1) as Binary15);
  const [inM, setInM] = React.useState(memory.read(cpuStatus.aregister.slice(1) as Binary15));
  const [aregister, setAregister] = React.useState(cpuStatus.aregister);
  const [dregister, setDregister] = React.useState(cpuStatus.dregister);

  function nextStep() {
    let instruction = rom.read(pc);
    let res = cpu.write(inM, instruction, 0);
    const input = res[0];
    const load = res[1];
    const address = res[2];

    memory.write(input, load, address);

    const cpuStatus = cpu.status();

    setPC(cpuStatus.pc.slice(1) as Binary15);
    setInM(memory.read(address));
    setAregister(cpuStatus.aregister);
    setDregister(cpuStatus.dregister);
  }

  function onSelectChange(event: React.FormEvent<HTMLSelectElement>) {
    const value = event.currentTarget.value;
    writeRom(rom, samples[value]);

    cpu.reset();
    const cpuStatus = cpu.status();

    setPC(cpuStatus.pc.slice(1) as Binary15);
    setInM(zero());
    setAregister(cpuStatus.aregister);
    setDregister(cpuStatus.dregister);
  }

  function onResetClick() {
    cpu.reset();
    const cpuStatus = cpu.status();

    setPC(cpuStatus.pc.slice(1) as Binary15);
    setInM(zero());
    setAregister(cpuStatus.aregister);
    setDregister(cpuStatus.dregister);
  }

  return (
    <>
      <style jsx>{styles}</style>
      <div>
        <select onChange={onSelectChange}>
          <option value="add">Add</option>
          <option value="max">Max</option>
          <option value="rect">Rect</option>
        </select>
        <button onClick={nextStep}>Next Step</button>
        <button onClick={onResetClick}>Reset</button>
        <div>
          <div>PC {b2s(pc)}</div>
          <div>A {b2s(aregister)}</div>
          <div>D {b2s(dregister)}</div>
        </div>
      </div>
      <div className="container">
        <section>
          <table>
            <thead>
              <tr>
                <th colSpan={6}>ROM</th>
              </tr>
            </thead>
            <tbody>
              {read(rom, 15, romPage * count, (romPage + 1) * count).map((res) => {
                const isCurrentInstruction = parseInt(pc.join(''), 2) === parseInt(res.address.join(''), 2);
                return (
                  <tr
                    key={res.address.join('')}
                    className={classnames({ 'is-current-instruction': isCurrentInstruction })}
                  >
                    <th>{parseInt(res.address.join(''), 2)}</th>
                    {b2s(res.value)
                      .split(' ')
                      .map((val, i) => {
                        return <td key={res.address.join('') + i}>{val}</td>;
                      })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section>
          <table>
            <thead>
              <tr>
                <th colSpan={6}>RAM</th>
              </tr>
            </thead>
            <tbody>
              {read(memory, 15, ramPage * count, (ramPage + 1) * count).map((res) => {
                const isCurrentAddress = parseInt(aregister.join(''), 2) === parseInt(res.address.join(''), 2);
                return (
                  <tr key={res.address.join('')} className={classnames({ 'is-current-address': isCurrentAddress })}>
                    <th>{parseInt(res.address.join(''), 2)}</th>
                    {b2s(res.value)
                      .split(' ')
                      .map((val, i) => {
                        return <td key={res.address.join('') + i}>{val}</td>;
                      })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section>
          <canvas width={512} height={256} />
        </section>
      </div>
    </>
  );
}
