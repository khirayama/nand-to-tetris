import assert from 'power-assert';
import { Bit } from './Bit';

describe('Bit', function () {
  it('should return collect Binary', function () {
    const bit = new Bit();
    bit.write(1, 0);
    assert.equal(bit.read(), 0);
    bit.write(1, 0);
    assert.equal(bit.read(), 0);
    bit.write(1, 1);
    assert.equal(bit.read(), 1);
    bit.write(1, 0);
    assert.equal(bit.read(), 1);
    bit.write(1, 0);
    assert.equal(bit.read(), 1);
    bit.write(0, 1);
    assert.equal(bit.read(), 0);
    bit.write(1, 0);
    assert.equal(bit.read(), 0);
  });
});
