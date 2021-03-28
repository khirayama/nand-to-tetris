import * as React from 'react';
import { css } from 'styled-jsx/css';

const styles = css`
  .container {
    width: 100%;
    padding: 12px;
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
`;

export function Controller(props: {
  onNextClick: (event?: React.MouseEvent) => void;
  onStartClick: (event?: React.MouseEvent) => void;
  onStopClick: (event?: React.MouseEvent) => void;
  onResetClick: (event?: React.MouseEvent) => void;
  onSelectChange: (event: React.FormEvent<HTMLSelectElement>) => void;
}) {
  return (
    <>
      <style jsx>{styles}</style>
      <div className="container">
        <p>
          TODO <input type="number" min={1} max={1000} value={1} /> steps/time
        </p>
        <p>
          TODO <input type="number" min={1} max={1000} value={10} /> times/s
        </p>
        <button onClick={props.onNextClick}>Next Step</button>
        <button onClick={props.onResetClick}>Reset</button>
        <button onClick={props.onStartClick}>Start</button>
        <button onClick={props.onStopClick}>Stop</button>
        <div>
          <span>LOAD SAMPLE</span>
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
