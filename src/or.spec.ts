import assert from 'power-assert';
import { or } from './or';

describe('Or', function () {
  it('should return collect Binary', function () {
    assert.equal(or(0, 0), 0);
    assert.equal(or(0, 1), 1);
    assert.equal(or(1, 0), 1);
    assert.equal(or(1, 1), 1);
  });
});
