import assert from 'power-assert';
import { and } from './and';

describe('And', function () {
  it('should return correct Binary', function () {
    assert.equal(and(0, 0), 0);
    assert.equal(and(0, 1), 0);
    assert.equal(and(1, 0), 0);
    assert.equal(and(1, 1), 1);
  });
});
