import assert from 'power-assert';
import { DFF } from './DFF';

describe('DFF', function () {
  it('should return correct Binary', function () {
    const dff = new DFF();
    dff.write(1);
    assert.equal(dff.read(), 1);
    dff.write(0);
    assert.equal(dff.read(), 0);
    dff.write(1);
    assert.equal(dff.read(), 1);
    dff.write(0);
    assert.equal(dff.read(), 0);
  });
});
