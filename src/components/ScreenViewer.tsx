import * as React from 'react';
import { css } from 'styled-jsx/css';

import { Binary15 } from '../hardware/types';
import { RAMMock } from '../helpers/RAMMock';

const width = 512;
const res = 4;
const limit = Math.pow(2, 13);

const styles = css`
  .container {
    width: ${width + 4}px;
  }

  canvas {
    width: ${width}px;
    height: ${width / 2}px;
    border: solid 2px #000;
    transform: translateZ(0);
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
        let current = 16384; /* 0100 0000 0000 0000 */
        for (let i = 0; i < limit; i += 1) {
          const address = current
            .toString(2)
            .split('')
            .map((b) => Number(b)) as Binary15;
          const output = props.memory.read(address);
          result.push(output);
          current += 1;
        }
        const pixels = result.flat(1);

        for (let i = 0; i < pixels.length; i += 1) {
          const pixel = pixels[i];
          const l = Math.floor(i / width);
          const c = i % width;
          ctx.fillStyle = pixel === 1 ? 'rgba(0, 0, 0)' : 'rgb(233, 233, 233)';
          ctx.fillRect(c * res, l * res, res, res);
        }
        ctx.fill();
      }
    }
  }, []);

  React.useEffect(() => {
    if (ref.current) {
      const start = 16384;
      const ctx = ref.current.getContext('2d');
      for (const address of props.memory.lastAccessAddresses) {
        if (address && ctx) {
          const addrss = parseInt(address.join(''), 2);
          if (addrss - start >= 0) {
            const pixels = props.memory.read(address);
            const len = pixels.length;
            const startPosition = (addrss - start) * len;
            for (let i = 0; i < len; i += 1) {
              const pixel = pixels[i];
              const l = Math.floor((startPosition + i) / width);
              const c = (startPosition + i) % width;
              ctx.fillStyle = pixel === 1 ? 'rgba(0, 0, 0)' : 'rgb(233, 233, 233)';
              ctx.fillRect(c * res, l * res, res, res);
            }
            ctx.fill();
          }
        }
        ref.current.getContext('2d')?.drawImage(ref.current, 0, 0);
      }
      props.memory.lastAccessAddresses = [];
    }
  });

  return (
    <>
      <style jsx>{styles}</style>
      <div className="container">
        <h3>SCREEN</h3>
        <canvas width={width * res} height={(width / 2) * res} ref={ref} />
      </div>
    </>
  );
}
