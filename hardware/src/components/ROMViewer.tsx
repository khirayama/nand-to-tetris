import * as React from 'react';
import classnames from 'classnames';
import { css } from 'styled-jsx/css';

import { RAMMock } from '../hardware/RAMMock';
import { b2s } from '../hardware/helpers';
import { Binary15, Word } from '../hardware/types';

const styles = css`
  .rom-viewer {
    border: solid 2px #000;
    max-height: 100%;
    overflow: scroll;
  }

  .rom-viewer h3 {
    position: sticky;
    top: 0;
    border-bottom: solid 2px #000;
    background: #fff;
    padding: 2px 4px;
    font-size: 1rem;
  }

  .table-container table tbody th {
    min-width: 4rem;
    padding: 2px 4px;
    text-align: right;
    border-right: solid 2px #333;
  }

  .table-container table tbody td {
    padding: 2px 4px;
    text-align: right;
  }

  .is-current {
    background: #ffd600;
  }
`;

export function ROMViewer(props: { rom: RAMMock; pc: Word; addresses: Binary15[] }) {
  return (
    <>
      <style jsx>{styles}</style>
      <div className="rom-viewer">
        <h3>ROM</h3>
        <div className="table-container">
          <table>
            <tbody>
              {props.addresses.map((address) => {
                const addressString = address.join('');
                const isCurrent = addressString === props.pc.slice(1).join('');
                return (
                  <tr key={`rom-${addressString}`} className={classnames({ 'is-current': isCurrent })}>
                    <th>{parseInt(addressString, 2)}</th>
                    <td>{b2s(props.rom.read(address))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
