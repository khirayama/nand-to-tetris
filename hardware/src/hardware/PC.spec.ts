import assert from 'power-assert';
import { b } from './helpers';
import { PC } from './PC';

describe('PC', function () {
  it('should return correct Binary', function () {
    const pc = new PC();
    assert.deepEqual(pc.write(b('0000 0000 0000 0000'), 1, 0, 0), b('0000 0000 0000 0000'));
    assert.deepEqual(pc.write(b('0000 0000 0000 0000'), 1, 0, 0), b('0000 0000 0000 0001'));
    assert.deepEqual(pc.write(b('0000 0000 0000 0000'), 1, 0, 0), b('0000 0000 0000 0010'));
    assert.deepEqual(pc.write(b('0000 0000 0000 0000'), 1, 0, 0), b('0000 0000 0000 0011'));
    assert.deepEqual(pc.write(b('0000 0000 0001 0000'), 0, 1, 0), b('0000 0000 0000 0100'));
    assert.deepEqual(pc.write(b('0000 0000 0001 0000'), 1, 1, 0), b('0000 0000 0001 0000'));
    assert.deepEqual(pc.write(b('0000 0000 0001 0000'), 1, 1, 1), b('0000 0000 0001 0000'));
    assert.deepEqual(pc.read(), b('0000 0000 0000 0000'));
  });
});
