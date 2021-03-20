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

export function ALUViewer(props: { dInput: Word; maInput: Word; output: Word }) {
  return (
    <>
      <style jsx>{styles}</style>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th colSpan={2}>ALU</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>D Input</th>
              <td>{b2s(props.dInput)}</td>
            </tr>
            <tr>
              <th>M/A Input</th>
              <td>{b2s(props.maInput)}</td>
            </tr>
            <tr>
              <th>Output</th>
              <td>{b2s(props.output)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
