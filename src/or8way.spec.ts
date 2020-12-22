import assert from 'power-assert';
import { Binary, Binary8 } from './types';
import { b } from './helpers';
import { or8way } from './or8way';

describe('Or8Way', function () {
  it('should return correct Binary', function () {
    assert.equal(or8way(b<Binary8>('0000 0000')), 0);
    assert.equal(or8way(b<Binary8>('1000 0000')), 1);
    assert.equal(or8way(b<Binary8>('0001 0000')), 1);
    assert.equal(or8way(b<Binary8>('0000 0001')), 1);
    assert.equal(or8way(b<Binary8>('1111 1111')), 1);
  });
});
