import assert from 'power-assert';
import { DFF } from './DFF';

describe('DFF', function () {
  it('should return correct Binary', function () {
    const dff = new DFF();
    assert.equal(dff.write(1), 0);
    assert.equal(dff.write(1), 1);
    assert.equal(dff.write(0), 1);
    assert.equal(dff.write(0), 0);
  });
});
