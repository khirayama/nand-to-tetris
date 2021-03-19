import * as React from 'react';
import { css } from 'styled-jsx/css';

const styles = css`
  canvas {
    border: solid 2px #000;
  }
`;

export function ScreenViewer() {
  const ref = React.createRef<HTMLCanvasElement>();
  const width = 512;

  const pixels: number[] = [];
  for (let i = 0; i < 512 * 256; i += 1) {
    pixels.push(i % 2 === 0 ? 0 : 1);
  }

  React.useEffect(() => {
    if (ref.current) {
      const ctx = ref.current.getContext('2d');
      if (ctx) {
        for (let i = 0; i < pixels.length; i += 1) {
          const pixel = pixels[i];
          const l = Math.floor(i / width);
          const c = i % width;
          ctx.fillRect(c, l, 1, 1);
          if (pixel === 1) {
            ctx.fillStyle = 'rgb(0, 0, 0)';
          } else {
            ctx.fillStyle = 'rgb(200, 200, 200)';
          }
          ctx.fill();
        }
      }
    }
  });

  return (
    <>
      <style jsx>{styles}</style>
      <canvas width={512} height={256} ref={ref} />
    </>
  );
}
