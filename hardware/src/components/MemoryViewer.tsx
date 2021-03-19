import * as React from 'react';
import { css } from 'styled-jsx/css';
import { RAM16K } from '../hardware/RAM16K';
import { RAM4K } from '../hardware/RAM4K';
import { RAM512 } from '../hardware/RAM512';
import { RAM64 } from '../hardware/RAM64';
import { RAM8 } from '../hardware/RAM8';
import { Memory } from '../hardware/Memory';
import { b, zero, b2s } from '../hardware/helpers';
import { Binary15, Word } from '../hardware/types';

const styles = css`
  .table-container {
    border: solid 2px #000;
    max-height: 100%;
    overflow: scroll;
  }
`;

export function MemoryViewer(props: { memory: Memory; addresses: Binary15[] }) {
  return (
    <>
      <style jsx>{styles}</style>
      <div className="table-container">
        <table>
          <tbody>
            {props.addresses.map((address) => {
              const addressString = address.join('');
              return (
                <tr key={`memory-${addressString}`}>
                  <th>{parseInt(addressString, 2)}</th>
                  <td>{b2s(props.memory.read(address))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
