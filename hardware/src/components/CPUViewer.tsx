import * as React from 'react';
import { css } from 'styled-jsx/css';

import { b2s } from '../hardware/helpers';
import { Word } from '../hardware/types';

const styles = css`
  .table-container {
    display: inline-block;
    border: solid 2px #333;
    max-height: 100%;
    overflow: scroll;
    vertical-align: top;
  }

  .table-container table thead tr {
    border-bottom: solid 2px #333;
  }

  .table-container table thead th {
    padding: 2px 4px;
  }

  .table-container table tbody tr + tr {
    border-top: solid 2px #333;
  }

  .table-container table tbody th {
    min-width: 2rem;
    padding: 2px 4px;
    text-align: right;
    border-right: solid 2px #333;
  }

  .table-container table tbody td {
    padding: 2px 4px;
    text-align: right;
  }
`;

export function CPUViewer(props: { pc: Word; aregister: Word; dregister: Word }) {
  return (
    <>
      <style jsx>{styles}</style>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th colSpan={2}>CPU</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>PC</th>
              <td>{b2s(props.pc)}</td>
            </tr>
            <tr>
              <th>A</th>
              <td>{b2s(props.aregister)}</td>
            </tr>
            <tr>
              <th>D</th>
              <td>{b2s(props.dregister)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
