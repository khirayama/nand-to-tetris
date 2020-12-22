import assert from 'power-assert';
import { Bit } from './Bit';

describe('Bit', function () {
  it('should return collect Binary', function () {
    const bit = new Bit();
    assert.equal(bit.write(1, 0), 0);
    assert.equal(bit.write(1, 0), 0);
    assert.equal(bit.write(1, 1), 0);
    assert.equal(bit.write(1, 0), 1);
    assert.equal(bit.write(1, 0), 1);
    assert.equal(bit.write(0, 1), 1);
    assert.equal(bit.write(1, 0), 0);
  });
});
