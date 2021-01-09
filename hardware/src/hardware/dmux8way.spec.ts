import assert from 'power-assert';
import { b } from './helpers';
import { Binary8 } from './types';
import { dmux8way } from './dmux8way';

describe('DMux8Way', function () {
  it('should return correct Binary', function () {
    assert.deepEqual(dmux8way(0, [0, 0, 0]), b<Binary8>('0000 0000'));
    assert.deepEqual(dmux8way(1, [0, 0, 0]), b<Binary8>('1000 0000'));
    assert.deepEqual(dmux8way(1, [0, 0, 1]), b<Binary8>('0100 0000'));
    assert.deepEqual(dmux8way(1, [0, 1, 0]), b<Binary8>('0010 0000'));
    assert.deepEqual(dmux8way(1, [0, 1, 1]), b<Binary8>('0001 0000'));
    assert.deepEqual(dmux8way(1, [1, 0, 0]), b<Binary8>('0000 1000'));
    assert.deepEqual(dmux8way(1, [1, 0, 1]), b<Binary8>('0000 0100'));
    assert.deepEqual(dmux8way(1, [1, 1, 0]), b<Binary8>('0000 0010'));
    assert.deepEqual(dmux8way(1, [1, 1, 1]), b<Binary8>('0000 0001'));
  });
});
