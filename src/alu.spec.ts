import assert from 'power-assert';
import { alu } from './alu';

/*
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
 */
describe('ALU', function () {
  it('should return collect [Bus16, Binary, Binary]', function () {
    // zx = 0, nx = 0, zy = 0, ny = 0, f = 0, no = 0
    assert.deepEqual(
      alu(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        0,
        0,
        0,
        0,
        0,
        0,
      ),
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1, 0],
    );
    assert.deepEqual(
      alu(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        0,
        0,
        0,
        0,
        0,
        0,
      ),
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], 0, 0],
    );
    // zx = 0, nx = 0, zy = 0, ny = 0, f = 1, no = 0
    assert.deepEqual(
      alu(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        0,
        0,
        0,
        0,
        1,
        0,
      ),
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1, 0],
    );
    assert.deepEqual(
      alu(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        0,
        0,
        0,
        0,
        1,
        0,
      ),
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1], 0, 0],
    );
    assert.deepEqual(
      alu(
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        0,
        0,
        0,
        0,
        1,
        0,
      ),
      [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0], 0, 1],
    );
    // zx = 1, nx = 0, zy = 0, ny = 0, f = 0, no = 0
    assert.deepEqual(
      alu(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        1,
        0,
        0,
        0,
        0,
        0,
      ),
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1, 0],
    );
    // zx = 1, nx = 0, zy = 0, ny = 0, f = 1, no = 0
    assert.deepEqual(
      alu(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        1,
        0,
        0,
        0,
        1,
        0,
      ),
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1], 0, 0],
    );
    // zx = 0, nx = 1, zy = 0, ny = 0, f = 0, no = 0
    assert.deepEqual(
      alu(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        0,
        1,
        0,
        0,
        0,
        0,
      ),
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0], 0, 0],
    );
    // zx = 0, nx = 1, zy = 0, ny = 0, f = 1, no = 0
    assert.deepEqual(
      alu(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        0,
        1,
        0,
        0,
        1,
        0,
      ),
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 0, 0],
    );
    // zx = 0, nx = 0, zy = 1, ny = 0, f = 0, no = 0
    assert.deepEqual(
      alu(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        0,
        0,
        1,
        0,
        0,
        0,
      ),
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1, 0],
    );
    // zx = 0, nx = 0, zy = 1, ny = 0, f = 1, no = 0
    assert.deepEqual(
      alu(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        0,
        0,
        1,
        0,
        1,
        0,
      ),
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], 0, 0],
    );
    // zx = 0, nx = 0, zy = 0, ny = 1, f = 0, no = 0
    assert.deepEqual(
      alu(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        0,
        0,
        0,
        1,
        0,
        0,
      ),
      [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1, 0],
    );
    // zx = 0, nx = 0, zy = 0, ny = 1, f = 1, no = 0
    assert.deepEqual(
      alu(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        0,
        0,
        0,
        1,
        1,
        0,
      ),
      [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1], 0, 1],
    );
    // zx = 0, nx = 0, zy = 0, ny = 0, f = 0, no = 1
    assert.deepEqual(
      alu(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        0,
        0,
        0,
        0,
        0,
        1,
      ),
      [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 0, 1],
    );
  });
});
