import assert from 'power-assert';
import { dmux8way } from './dmux8way';

describe('DMux8Way', function () {
  it('should return correct Binary', function () {
    assert.deepEqual(dmux8way(0, [0, 0, 0]), [0, 0, 0, 0, 0, 0, 0, 0]);
    assert.deepEqual(dmux8way(1, [0, 0, 0]), [1, 0, 0, 0, 0, 0, 0, 0]);
    assert.deepEqual(dmux8way(1, [0, 0, 1]), [0, 1, 0, 0, 0, 0, 0, 0]);
    assert.deepEqual(dmux8way(1, [0, 1, 0]), [0, 0, 1, 0, 0, 0, 0, 0]);
    assert.deepEqual(dmux8way(1, [0, 1, 1]), [0, 0, 0, 1, 0, 0, 0, 0]);
    assert.deepEqual(dmux8way(1, [1, 0, 0]), [0, 0, 0, 0, 1, 0, 0, 0]);
    assert.deepEqual(dmux8way(1, [1, 0, 1]), [0, 0, 0, 0, 0, 1, 0, 0]);
    assert.deepEqual(dmux8way(1, [1, 1, 0]), [0, 0, 0, 0, 0, 0, 1, 0]);
    assert.deepEqual(dmux8way(1, [1, 1, 1]), [0, 0, 0, 0, 0, 0, 0, 1]);
  });
});
