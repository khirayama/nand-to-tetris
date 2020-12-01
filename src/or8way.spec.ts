import assert from 'power-assert';
import { or8way } from './or8way';

describe('Or8Way', function () {
  it('should return collect Binary', function () {
    assert.equal(or8way([0, 0, 0, 0, 0, 0, 0, 0]), 0);
    assert.equal(or8way([1, 0, 0, 0, 0, 0, 0, 0]), 1);
    assert.equal(or8way([0, 0, 0, 1, 0, 0, 0, 0]), 1);
    assert.equal(or8way([0, 0, 0, 0, 0, 0, 0, 1]), 1);
    assert.equal(or8way([1, 1, 1, 1, 1, 1, 1, 1]), 1);
  });
});
