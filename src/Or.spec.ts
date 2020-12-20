import assert from 'power-assert';
import { Or } from './Or';

describe('Or', function () {
  it('should return correct Binary', function () {
    assert.equal(Or(0, 0), 0);
    assert.equal(Or(0, 1), 1);
    assert.equal(Or(1, 0), 1);
    assert.equal(Or(1, 1), 1);
  });
});
