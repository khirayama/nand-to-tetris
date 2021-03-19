import * as React from 'react';
import { css } from 'styled-jsx/css';

import { b2s } from '../hardware/helpers';
import { Word } from '../hardware/types';

const styles = css`
  canvas {
    border: solid 2px #000;
  }
`;

export function CPUViewer(props: { pc: Word; aregister: Word; dregister: Word }) {
  return (
    <div>
      <div>PC {b2s(props.pc)}</div>
      <div>A {b2s(props.aregister)}</div>
      <div>D {b2s(props.dregister)}</div>
    </div>
  );
}
