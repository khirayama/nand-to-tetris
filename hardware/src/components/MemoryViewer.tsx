import * as React from 'react';
import classnames from 'classnames';
import { css } from 'styled-jsx/css';

import { Memory } from '../hardware/Memory';
import { b2s } from '../hardware/helpers';
import { Binary15, Word } from '../hardware/types';

const styles = css`
  .table-container {
    display: inline-block;
    border: solid 2px #333;
    max-height: 512px;
    overflow: scroll;
    vertical-align: top;
  }

  .table-container table thead tr {
    border-bottom: solid 2px #333;
  }

  .table-container table thead th {
    padding: 2px 4px;
  }

  .table-container table thead td {
    padding: 2px 4px;
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

export function MemoryViewer(props: { memory: Memory; aregister: Word; addresses: Binary15[] }) {
  return (
    <>
      <style jsx>{styles}</style>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th colSpan={2}>RAM</th>
            </tr>
          </thead>
          <tbody>
            {props.addresses.map((address) => {
              const addressString = address.join('');
              const isCurrent = addressString === props.aregister.slice(1).join('');
              return (
                <tr key={`memory-${addressString}`} className={classnames({ 'is-current': isCurrent })}>
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
