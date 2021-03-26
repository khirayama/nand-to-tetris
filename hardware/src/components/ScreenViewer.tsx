import * as React from 'react';
import { css } from 'styled-jsx/css';

import { Word } from '../hardware/types';
import { inc16 } from '../hardware/inc16';
import { Memory } from '../hardware/Memory';

const width = 512;
const res = 4;
const limit = Math.pow(2, 13);

const styles = css`
  canvas {
    width: ${width}px;
    height: ${width / 2}px;
    border: solid 2px #000;
  }
`;

export function ScreenViewer(props: { memory: RAMMock }) {
  const ref = React.createRef<HTMLCanvasElement>();

  React.useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d');
      if (ctx) {
        const result = [];
        let current: Word = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i = 0; i < limit; i += 1) {
          const output = props.memory.read([
            current[1],
            current[2],
            current[3],
            current[4],
            current[5],
            current[6],
            current[7],
            current[8],
            current[9],
            current[10],
            current[11],
            current[12],
            current[13],
            current[14],
            current[15],
          ]);
          result.push(output);
          current = inc16(current);
        }
        const pixels = result.flat(2);

        for (let i = 0; i < pixels.length; i += 1) {
          const pixel = pixels[i];
          const l = Math.floor(i / width);
          const c = i % width;
          ctx.fillStyle = pixel === 1 ? 'rgba(0, 0, 0)' : 'rgb(233, 233, 233)';
          ctx.fillRect(c * res, l * res, res, res);
          ctx.fill();
        }
      }
    }
  });

  return (
    <>
      <style jsx>{styles}</style>
      <canvas width={width * res} height={(width / 2) * res} ref={ref} />
    </>
  );
}
