import * as React from 'react';
import { css } from 'styled-jsx/css';

import { Binary15, Word } from '../hardware/types';
import { inc16 } from '../hardware/inc16';
import { b } from '../hardware/helpers';
import { Memory } from '../hardware/Memory';

const styles = css`
  canvas {
    width: 512px;
    height: 256px;
    border: solid 2px #000;
  }
`;

export function ScreenViewer(props: { memory: Memory }) {
  const ref = React.createRef<HTMLCanvasElement>();
  const width = 512;
  const res = 4;

  React.useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d');
      if (ctx) {
        const result = [];
        let current = b<Word>('0100 0000 0000 0000');
        const limit = Math.pow(2, 13);
        for (let i = 0; i < limit; i += 1) {
          result.push(props.memory.read(current.slice(1) as Binary15));
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
