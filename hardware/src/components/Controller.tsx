import * as React from 'react';
import { css } from 'styled-jsx/css';

const styles = css`
  .container {
    width: 100%;
    padding: 12px;
  }

  button {
    padding: 4px 8px;
    border-radius: 2px;
    border: solid 1px #333;
  }

  button + button {
    margin-left: 12px;
  }
`;

export function Controller(props: {
  onNextClick: (event?: React.MouseEvent) => void;
  onResetClick: (event?: React.MouseEvent) => void;
}) {
  return (
    <>
      <style jsx>{styles}</style>
      <div className="container">
        <button onClick={props.onNextClick}>Next Step</button>
        <button onClick={props.onResetClick}>Reset</button>
      </div>
    </>
  );
}
