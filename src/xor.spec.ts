import assert from 'power-assert';
import { xor } from './xor';

describe('Xor', function () {
  it('should return collect Binary', function () {
    assert.equal(xor(0, 0), 1);
    assert.equal(xor(0, 1), 0);
    assert.equal(xor(1, 0), 0);
    assert.equal(xor(1, 1), 1);
  });
});
