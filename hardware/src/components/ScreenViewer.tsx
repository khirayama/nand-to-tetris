import * as React from 'react';
import { css } from 'styled-jsx/css';

import { Binary15 } from '../hardware/types';
import { RAMMock } from '../helpers/RAMMock';

const width = 512;
const res = 4;
const limit = Math.pow(2, 13);

const styles = css`
  canvas {
    width: ${width}px;
    height: ${width / 2}px;
    border: solid 2px #000;
  }

  h3 {
    font-size: 1rem;
    border: solid 2px #000;
    border-bottom: 0;
    padding: 2px 4px;
  }
`;

export function ScreenViewer(props: { memory: RAMMock }) {
  const ref = React.createRef<HTMLCanvasElement>();

  React.useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d');
      if (ctx) {
        const result = [];
        // let current: Word = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let current = 16384; /* 0100 0000 0000 0000 */
        const s1 = new Date();
        for (let i = 0; i < limit; i += 1) {
          const address = current
            .toString(2)
            .split('')
            .map((b) => Number(b)) as Binary15;
          const output = props.memory.read(address);
          result.push(output);
          current += 1;
        }
        const s2 = new Date();
        const pixels = result.flat(2);
        const s3 = new Date();

        for (let i = 0; i < pixels.length; i += 1) {
          const pixel = pixels[i];
          const l = Math.floor(i / width);
          const c = i % width;
          ctx.fillStyle = pixel === 1 ? 'rgba(0, 0, 0)' : 'rgb(233, 233, 233)';
          ctx.fillRect(c * res, l * res, res, res);
        }
        const s4 = new Date();
        ctx.fill();
        const s5 = new Date();

        console.log(
          s2.getTime() - s1.getTime(),
          s3.getTime() - s2.getTime(),
          s4.getTime() - s3.getTime(),
          s5.getTime() - s4.getTime(),
        );
      }
    }
  });

  return (
    <>
      <style jsx>{styles}</style>
      <div>
        <h3>SCREEN</h3>
        <canvas width={width * res} height={(width / 2) * res} ref={ref} />
      </div>
    </>
  );
}
