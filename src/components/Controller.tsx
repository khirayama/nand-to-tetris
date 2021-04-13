import * as React from 'react';
import { css } from 'styled-jsx/css';

const styles = css`
  .container {
    width: 100%;
    padding: 0 12px;
  }

  .container div + div {
    padding: 12px 0;
  }

  button,
  select {
    padding: 4px 8px;
    border-radius: 2px;
    border: solid 1px #333;
  }

  button + button,
  button + select {
    margin-left: 12px;
  }

  input[type='number'] {
    text-align: right;
    border-bottom: solid 1px #aaa;
  }

  label {
    padding-right: 4px;
  }
`;

export function Controller(props: {
  stepPerFrame: number;
  onNextClick: (event?: React.MouseEvent) => void;
  onStartClick: (event?: React.MouseEvent) => void;
  onStopClick: (event?: React.MouseEvent) => void;
  onResetClick: (event?: React.MouseEvent) => void;
  onSelectChange: (event: React.FormEvent<HTMLSelectElement>) => void;
  onStepsPerSecondChange: (event: React.FormEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <style jsx>{styles}</style>
      <div className="container">
        <div>
          <button onClick={props.onNextClick}>Next Step</button>
          <button onClick={props.onStartClick}>Start</button>
          <button onClick={props.onStopClick}>Stop</button>
          <button onClick={props.onResetClick}>Reset CPU</button>
        </div>
        <div>
          <input
            type="number"
            min={1}
            max={100000}
            value={props.stepPerFrame}
            onChange={props.onStepsPerSecondChange}
          />{' '}
          steps/frame = {Math.floor((props.stepPerFrame * 1000) / 60).toLocaleString()} steps/second
        </div>
        <div>
          <label>LOAD ROM</label>
          <select onChange={props.onSelectChange}>
            <option value="add">Add</option>
            <option value="max">Max</option>
            <option value="rect">Rect</option>
            <option value="fill">Fill</option>
            <option value="mult">Mult</option>
          </select>
        </div>
      </div>
    </>
  );
}
