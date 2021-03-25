import assert from 'power-assert';
import { b } from './helpers';
import { PC } from './PC';

describe('PC', function () {
  it('should return correct Binary', function () {
    const pc = new PC();
    pc.write(b('0000 0000 0000 0000'), 1, 0, 0);
    assert.deepEqual(pc.read(), b('0000 0000 0000 0001'));
    pc.write(b('0000 0000 0000 0000'), 1, 0, 0);
    assert.deepEqual(pc.read(), b('0000 0000 0000 0010'));
    pc.write(b('0000 0000 0000 0000'), 1, 0, 0);
    assert.deepEqual(pc.read(), b('0000 0000 0000 0011'));
    pc.write(b('0000 0000 0001 0000'), 0, 1, 0);
    assert.deepEqual(pc.read(), b('0000 0000 0001 0000'));
    pc.write(b('0000 0000 0001 0000'), 1, 1, 0);
    assert.deepEqual(pc.read(), b('0000 0000 0001 0000'));
    pc.write(b('0000 0000 0001 0000'), 1, 1, 1);
    assert.deepEqual(pc.read(), b('0000 0000 0000 0000'));
  });
});
