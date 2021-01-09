import assert from 'power-assert';
import { not } from './not';

describe('Not', function () {
  it('should return correct Binary', function () {
    assert.equal(not(0), 1);
    assert.equal(not(1), 0);
  });
});
