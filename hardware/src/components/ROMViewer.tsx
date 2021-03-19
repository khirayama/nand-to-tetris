import * as React from 'react';
import { css } from 'styled-jsx/css';
import { RAM16K } from '../hardware/RAM16K';
import { b, b2s, zero } from '../hardware/helpers';
import { Binary15, Word } from '../hardware/types';

const styles = css`
  .table-container {
    border: solid 2px #000;
    max-height: 100%;
    overflow: scroll;
  }
`;

export function ROMViewer(props: { rom: RAM16K; addresses: Binary15[] }) {
  return (
    <>
      <style jsx>{styles}</style>
      <div className="table-container">
        <table>
          <tbody>
            {props.addresses.map((address) => {
              const addressString = address.join('');
              return (
                <tr key={`rom-${addressString}`}>
                  <th>{parseInt(addressString, 2)}</th>
                  <td>{b2s(props.rom.read(address))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
